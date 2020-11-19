import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Directives
import { AlertComponent } from './directives/alert/alert.component';

//Components
import { SpinnerComponent } from './component/spinner/spinner.component';
import { DateTimePickerComponent } from './component/date-time-picker/date-time-picker.component';

@NgModule({
  declarations: [
    AlertComponent,
    SpinnerComponent,
    DateTimePickerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule,
    AlertComponent,
    SpinnerComponent,
    DateTimePickerComponent
  ]
})
export class SharedModule { }
