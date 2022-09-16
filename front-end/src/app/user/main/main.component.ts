import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  rolepermission = false;
  userpermission = false;
  constructor() {
    this.rolepermission = JSON.parse(localStorage.getItem("rolepermission") || 'false');
    this.userpermission = JSON.parse(localStorage.getItem("userpermission") || 'false');
  }

  ngOnInit(): void {
  }
  logout(){
    localStorage.clear()
  }
}
