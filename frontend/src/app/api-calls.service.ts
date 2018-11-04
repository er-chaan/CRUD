import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  _url = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  createEntry(userData, headers) {
    return this._http.post<any>(this._url+"createEntry", userData, {headers: headers})
            .pipe(catchError(this.errorHandler));
  }
  retrieveEntry(parameters, headers) {
    return this._http.get<any>(this._url+"retrieveEntry/"+parameters,{headers: headers})
            .pipe(catchError(this.errorHandler));
  }
  updateEntry(parameters, headers) {
    return this._http.patch<any>(this._url+"updateEntry/"+parameters,{headers: headers})
            .pipe(catchError(this.errorHandler));
  }
  deleteEntry(parameters, headers) {
    return this._http.delete<any>(this._url+"deleteEntry/"+parameters,{headers: headers})
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
