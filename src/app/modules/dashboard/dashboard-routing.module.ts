import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './page/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
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
export class DashboardRoutingModule { }
