import { ApiServiceService } from './../../api-service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  taskListDetails: any;
  usersList: any;
  userid = "";

  constructor(private api: ApiServiceService, private _router: Router) { }

  ngOnInit(): void {
    this.bind();

    this.api.post("users/list", {}).subscribe((result: any) => {
      this.usersList = result.data;
      console.log(result)
    })
  }

  bind() {
    console.log(this.userid);
    this.api.post("tasks/list", {userid:this.userid}).subscribe((result: any) => {
      this.taskListDetails = result.data;
      console.log(result);
    })
  }

  Delete(id: any) {
    this.api.post("tasks/delete", { data: { id: id } }).subscribe((result: any) => {
      console.log(result)
      this.bind();
    })
  }

  Edit(id:any){
    this._router.navigate(['tasks/addtask', id])
  }

  addTask(id: any){
    this._router.navigate(['tasks/addtask', id])
  }
}
