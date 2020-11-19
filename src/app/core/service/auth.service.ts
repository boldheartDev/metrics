import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: any){
    return this.http.post<any>('https://boldheart.com/sales/api/v2/auth/authenticate.php', { email: email, password: password })
      .pipe(map(user => {
        if(user && user.accessToken){
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      }))
  }

  updateUser(email: any, id: any){
    return this.http.post<any>('https://boldheart.com/members/api/v2/auth/update.php', { email: email, id: id })
    .pipe(map(user => {
      if(user && user.accessToken){
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(user));
      }
      return user
    }),
      catchError(this.errorHandle)
    )
  }

  logout(){
    localStorage.removeItem('currentUser');
  }

  //Error handling
  errorHandle(error){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      //Get client-side error
      errorMessage = error.error.message;
    }else{
      //Get server-side error
      errorMessage = `ErrorCodeL ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
