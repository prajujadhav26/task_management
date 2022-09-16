import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  usersList: any;
  addTaskForm: any;
  submitted = false;

  constructor(private api: ApiServiceService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id')
      this.addTask(id);
    });
    this.api.post("users/list", {}).subscribe((result: any) => {
      this.usersList = result.data;
    })
  }

  addTask(id: any) {
    if (id === 0 || id == null) {
      this.addTaskForm = new FormGroup({
        id: new FormControl(""),
        userid: new FormControl("", Validators.compose([Validators.required])),
        title: new FormControl("", Validators.compose([Validators.required])),
        description: new FormControl("", Validators.compose([Validators.required])),
        assignedon: new FormControl("", Validators.compose([Validators.required])),
        status: new FormControl("", Validators.compose([Validators.required])),
        closedon: new FormControl("")
      })
    }
    else{
      this.api.post("tasks/get", {data: {id:id}}).subscribe((result:any) =>{
        let list = result.data;

        this.addTaskForm = new FormGroup({
          id: new FormControl(list._id),
          userid: new FormControl(list.userid, Validators.compose([Validators.required])),
          title: new FormControl(list.title, Validators.compose([Validators.required])),
          description: new FormControl(list.description, Validators.compose([Validators.required])),
          assignedon: new FormControl(list.assignedon, Validators.compose([Validators.required])),
          status: new FormControl(list.status, Validators.compose([Validators.required])),
          closedon: new FormControl(list.closedon)
        })
      })
    }
  }

  get f() {
    return this.addTaskForm.controls;
  }

  onClickSave(data: any) {
    this.submitted = true;
    if (this.addTaskForm.invalid) {
      return;
    }
    if(data.id == null)
      data.id = "";
    console.log(data);
    this.api.post("tasks/save", { data: data }).subscribe((result: any) => {
      console.log(result);
      this._router.navigateByUrl("tasks");
    })
  }
}
