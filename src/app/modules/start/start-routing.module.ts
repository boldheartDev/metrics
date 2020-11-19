import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from './page/start/start.component';

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]    
})
export class StartRoutingModule { }
