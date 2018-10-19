import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  _url = "http://api.dev/createEntry";
  constructor(private _http: HttpClient) { }

  createEntry(userData) {
    return this._http.post<any>(this._url, userData)
            .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }

}
