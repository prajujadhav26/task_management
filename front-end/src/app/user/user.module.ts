import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { TasksComponent } from './tasks/tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { AddTaskComponent } from './add-task/add-task.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddUserComponent } from './add-user/add-user.component';


@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    TasksComponent,
    DashboardComponent,
    MainComponent,
    AddTaskComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  exports: [
    UsersComponent,
    RolesComponent,
    TasksComponent,
    DashboardComponent
  ]
})
export class UserModule { }
