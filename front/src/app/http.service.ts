import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";
import { NzNotificationService } from "ng-zorro-antd/notification";
import { environment } from '../environments/environment';

interface IPostOptions {
  path: string;
  data: any;
}

// const baseUrl = environment.BASE_URL_API

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  qwe: any;

  constructor(private http: HttpClient,
              private notification: NzNotificationService) {
  }

  // apiUrl = baseUrl
  apiUrl = 'http://localhost:3000/api'
  // apiUrl = 'http://popkovks.ru/api'

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  get(path: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${path}`)
      .pipe(
        catchError(this.handleError())
      );
  }

  post(options: IPostOptions): Observable<any> {
    return this.http.post(`${this.apiUrl}/${options.path}`, options.data, this.httpOptions)
      .pipe(
        catchError(this.handleError())
      );
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${path}`, this.httpOptions)
      .pipe(
        catchError(this.handleError())
      );
  }

  put(options: IPostOptions): Observable<any> {
    return this.http.put(`${this.apiUrl}/${options.path}`, options.data, this.httpOptions)
      .pipe(
        catchError(this.handleError())
      );
  }


  private handleError<TResult>(): (error: any) => Observable<TResult> {
    return (error) => {
      this.notification.error('Ops:(', `Ошибка: ${error}`)
      console.log(error)
      return of();
    };
  }

  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     console.log(this.qwe)
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     this.notification.error('Ops:(', `Backend returned code ${error.status}, body was:', ${error.error}`)
  //     // console.error(
  //     //   `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }
}
