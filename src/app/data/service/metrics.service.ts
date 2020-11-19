import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {
  url = 'https://boldheart.com/metrics/api/metrics/getDials.php';
  constructor(private httpClient: HttpClient) {}

  public getDials(userId, start, end): Observable<any> {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    return this.httpClient.get('https://boldheart.com/metrics/api/metrics/getDials.php?id=' + userId + '&start=' + start + '&end=' + end)
    .pipe(
      map((data: any[]) => {
        return data;
      }),
      catchError(this.errorHandle)
    )
  }

  //Error handling
  errorHandle(error){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      //Get client-side error
      errorMessage = error.error.message;
    }else{
      //Get server-side error
      errorMessage = `ErrorCode: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
