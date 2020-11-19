import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  { 
    path: '', 
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  { 
    path: 'login', 
    loadChildren: () =>
      import('@modules/auth/auth.module').then(m => m.AuthModule) 
  },
  //Fallback when no prior route is matched
  {
    path: '**', redirectTo: '/dashboard', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, anchorScrolling: 'enabled'}, )],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
