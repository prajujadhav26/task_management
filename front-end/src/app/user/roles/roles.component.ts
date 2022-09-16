import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  roleForm :any;
  roleDetails:any;

  constructor(private api:ApiServiceService) { }

  ngOnInit(): void {
    this.bind();
    this.roleForm = new FormGroup({
      id : new FormControl(""),
      name : new FormControl("", Validators.compose([Validators.required])),
      rolepermission : new FormControl(true),
      userpermission : new FormControl(true)
    })
  }

  bind(){
    this.api.post("roles/list", {}).subscribe((result:any) =>{
      this.roleDetails = result.data;
      console.log(result)
    })
  }

  onClickAdd(data:any){
    console.log(this.roleForm.controls.name.value);
    console.log(data);
    this.api.post("roles/save", {data:data}).subscribe((result:any) =>{
      console.log(result);
      this.bind();
    })

  }

  Delete(id:any){
    this.api.post("roles/delete", {data:{id:id}}).subscribe((result:any) =>{
      this.bind();
    })
  }

  Edit(id:any){
    this.api.post("roles/get", {data:{id:id}}).subscribe((result:any) =>{
      let roleData = result.data;

      this.roleForm = new FormGroup({
        id : new FormControl(roleData._id),
        name : new FormControl(roleData.name, Validators.compose([Validators.required])),
        rolepermission : new FormControl(roleData.rolepermission),
        userpermission : new FormControl(roleData.userpermission)
      })
    })
  }
}
