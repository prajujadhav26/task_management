import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { PasswordStrengthValidator } from '../password-strength.validators';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm :any;
  email : any;
  password : any;
  loginFormData: any;
  submitted = false;

  constructor(private _router: Router, private api:ApiServiceService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      password: new FormControl("", Validators.compose([Validators.required, Validators.minLength(6)])),
    });
  }

  get f(){
    return this.loginForm.controls;
  }

  login(data:any){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.api.post("users/login", { data: data }).subscribe((result: any) => {
      console.log(result.data);
      if(result.status == "success"){
        localStorage.setItem("email",result.data[0].email);
        localStorage.setItem("userid",result.data[0]._id);
        localStorage.setItem("rolepermission",result.data[0].roleid.rolepermission);
        localStorage.setItem("userpermission",result.data[0].roleid.userpermission);
        this._router.navigateByUrl("/user");
      }
      else{
        alert("Invalid credentials");
      }
    })

  }
}
