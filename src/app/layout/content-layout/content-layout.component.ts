import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss', '../../app.component.scss']
})
export class ContentLayoutComponent implements OnInit {

  /*SubNavItems = [
    { "link": "tasks", "title": "Tasks", "icon": faList },
    { "link": "appointments", "title": "Appointments", "icon": faCalendarCheck },
  ]*/

  constructor() { }

  ngOnInit() {}

}
