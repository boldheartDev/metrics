import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../service/alert/alert.service';

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['../../../app.component.scss']

})
export class AlertComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  message: any;
  type: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.subscription = this.alertService.getMessage().subscribe(message => {
      this.message = message;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
