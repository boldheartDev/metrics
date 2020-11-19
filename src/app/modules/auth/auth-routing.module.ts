import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './page/login/login.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full',
  },
  { 
    path: 'login', 
    component: LoginComponent
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
