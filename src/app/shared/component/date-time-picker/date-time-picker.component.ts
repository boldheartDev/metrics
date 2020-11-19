import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss']
})
export class DateTimePickerComponent implements OnInit, OnChanges {
  @Input() callType: any;
  @Output() dateChangeEvent = new EventEmitter<string>();

  isChecked: boolean = false;
  date: any;
  hour: any = "00";
  minute: string = "00";
  period: string = "am";
  dateTime: any;
  milHour: any = "00";

  constructor(
    private datePipe: DatePipe
  ) { }

  ngOnChanges() {
    this.isChecked = false;
    this.dateChangeEvent.emit('unconfirmed');
  }

  setDate(value) {
    this.date = value;
    this.dateChangeEvent.emit(value);
  }

  ngOnInit() {
    
  }

}
