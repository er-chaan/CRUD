import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  _url = "http://localhost:8000/";
  constructor(private _http: HttpClient) { }

  createEntry(userData, headers) {
    return this._http.post<any>(this._url+"createEntry", userData, {headers: headers})
            .pipe(catchError(this.errorHandler));
  }
  uploadImage(userData, headers) {
    return this._http.post<any>(this._url+"uploadImage", userData, {headers: headers})
            .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error);
  }

}
