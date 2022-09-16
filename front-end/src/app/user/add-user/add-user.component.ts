import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  rolesList: any;
  userForm: any;
  submitted = false;

  constructor(private api: ApiServiceService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.addUser(id);
    });
    this.api.post("roles/list", {}).subscribe((result: any) => {
      this.rolesList = result.data;
    })
  }

  addUser(id: any) {
    if (id === 0 || id == null) {
      this.userForm = new FormGroup({
        id: new FormControl(""),
        name: new FormControl("", Validators.compose([Validators.required])),
        email: new FormControl("", Validators.compose([Validators.required])),
        password: new FormControl("", Validators.compose([Validators.required])),
        roleid: new FormControl("", Validators.compose([Validators.required]))
      })
    }
    else {
      this.api.post("users/get", { data: { id: id } }).subscribe((result: any) => {
        let usersList = result.data;

        this.userForm = new FormGroup({
          id: new FormControl(usersList._id),
          name: new FormControl(usersList.name, Validators.compose([Validators.required])),
          email: new FormControl(usersList.email, Validators.compose([Validators.required, Validators.email])),
          password: new FormControl(usersList.password, Validators.compose([Validators.required, Validators.minLength(6)])),
          roleid: new FormControl(usersList.roleid, Validators.compose([Validators.required]))
        })
      })
    }
  }

  get f() {
    return this.userForm.controls;
  }

  onClickSave(data: any) {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    if(data.id == null)
      data.id = "";
    console.log(data);
    this.api.post("users/save", { data: data }).subscribe((result: any) => {
      console.log(result)
      this._router.navigateByUrl("users")
    })
  }
}
