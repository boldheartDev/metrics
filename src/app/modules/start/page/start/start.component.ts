import { Component, OnInit } from '@angular/core';
import { User } from '@data/schema/user';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: [
    './start.component.scss',
    '../../../../app.component.scss'
  ]
})
export class StartComponent implements OnInit {
  currentUser: any;

  constructor() { 
    this.currentUser = {
      FirstName: 'Joe'
    }
  }

  ngOnInit() {
  }

}
