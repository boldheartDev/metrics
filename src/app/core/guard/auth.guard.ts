import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  today = new Date().getTime();
  now = this.datePipe.transform(this.today, 'yyyy-MM-ddTHH:mm:ss');
    
  nowFormat = new Date(this.now).getTime();

  constructor(
    private _router: Router,
    public datePipe: DatePipe
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(localStorage.getItem('currentUser')){
        //Logged in
        return true;
      }
      
      //Not logged in, redirect to login with return parameter
      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;


      /* For session timeout
      if(localStorage.getItem('storedUser')) {
        //set time window 
        var lapse = (60 * 60) * 2;
        //get last logged in date/time string
        var user = JSON.parse(localStorage.getItem('storedUser'));
        //convert last logged in date/time to date
        var lastLoggedLong = this.datePipe.transform(user._LastLoggedIn, 'yyyy-MM-ddTHH:mm:ss');
        //convert last logged in date/time to unix timestamp
        var lastLogged = new Date(lastLoggedLong).getTime();

        var diff = (this.nowFormat - lastLogged);
        var difference = Math.round(diff / 1000);

        if(difference < lapse){
          //Keep logged in
          return true;
        }else{
          //Log out
          this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }
      }
      
      //Not logged in so redirect to login page with the return url
      this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;*/
  }
  
}
