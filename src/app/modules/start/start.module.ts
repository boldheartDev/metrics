import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

import { StartRoutingModule } from './start-routing.module';

import { StartComponent } from './page/start/start.component';

@NgModule({
  declarations: [
    StartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    StartRoutingModule
  ]
})

export class StartModule { }
