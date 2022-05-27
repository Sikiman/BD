import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Type } from '../models/type.model';
import { config } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Array<Type>> {
    return this.http.get<Array<Type>>(`${config.apiUrl}/types`);
  }

  getTypeById(id: String): Observable<Type> {
    return this.http.get<Type>(`${config.apiUrl}/type?id=${id}`);
  }

  saveType(type: Type): Observable<Type>{
    return this.http.post<Type>(`${config.apiUrl}/type/save`, type, this.options)
    .pipe();
  }
}
