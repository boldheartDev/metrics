import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

import { MetricsService } from '@data/service/metrics.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    './dashboard.component.scss',
    '../../../../app.component.scss'
  ]
})
export class DashboardComponent implements OnInit {
  dials: any[];
  startDate: string;
  endDate: string;
  isLoading: boolean = false;
  isValid: boolean = false;

  public userSelect: any = '';

  private sub: Subscription = new Subscription();

  @Output() dateChangeEvent = new EventEmitter<string>();

  constructor(
    private router: Router,
    private metricsService: MetricsService,
    private datePipe: DatePipe
  ) { }

  //May want to add to server, like leadsource for SC
  users = [
    { name: 'Krysti Turznik', id: '438693' },
    { name: 'Liz Wright', id: '691122' },
    { name: 'Elizabeth Tritsch', id: '688778' }
  ]

  setUser(id){
    this.userSelect = id;
  }

  handleGetDials(){
    this.isLoading = true;
    console.log(this.userSelect)
    this.sub = this.metricsService.getDials(this.userSelect, this.startDate, this.endDate)
      .subscribe(
        (data) => {
          this.dials = data;
          console.log(this.dials);
        },
        (err) => console.log(err),
        () => this.isLoading = false
      )
  }

  handleSetStart(event){
    this.startDate = event + 'T' + '00:00:00.00Z';
  }

  handleSetEnd(event){
    this.endDate = event + 'T' + '00:00:00.00Z'
  }

  ngOnInit() {
    //this.handleGetTasks();
  }

}
