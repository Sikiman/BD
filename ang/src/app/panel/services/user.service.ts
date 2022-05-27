import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/app/config';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Array<User>> {
    return this.http.get<Array<User>>(`${config.apiUrl}/users`);
  }

  getUserById(id: String): Observable<User> {
    return this.http.get<User>(`${config.apiUrl}/user?id=${id}`);
  }

  saveUser(user: User): Observable<User>{
    return this.http.post<User>(`${config.apiUrl}/user/save`, user, this.options)
    .pipe();
  }
}
