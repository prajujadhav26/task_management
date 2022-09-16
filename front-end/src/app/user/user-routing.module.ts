import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './add-task/add-task.component';
import { AddUserComponent } from './add-user/add-user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { RolesComponent } from './roles/roles.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: "", component: MainComponent,
    children: [
      { path: "", component: DashboardComponent },
      { path: "users", component: UsersComponent },
      { path: "users/adduser/:id", component: AddUserComponent },
      { path: "roles", component: RolesComponent },
      { path: "tasks", component: TasksComponent },
      { path: "tasks/addtask/:id", component: AddTaskComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
