import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userDetails:any;
  rolesList:any;
  userForm:any;

  constructor(private api:ApiServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.bind();
  }

  bind(){
    this.api.post("users/list", {}).subscribe((result:any) =>{
      this.userDetails = result.data;
      console.log(result.data)
    })
  }



  Delete(id:any){
    this.api.post("users/delete", {data:{id:id}}).subscribe((result:any) =>{
      this.bind();
    })
  }

  addUser(id:any){
    this._router.navigate(['users/adduser', id])
  }

  Edit(id:any){
    this._router.navigate(['users/adduser', id])
  }
}
