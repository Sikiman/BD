import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { config } from './../../config';
import { Token } from '../models/token.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;

  options = {
    headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

  constructor(private http: HttpClient) {}

  login(user: { username: string, password: string }): Observable<boolean> {
    let body = new URLSearchParams();
    body.set("username", user.username);
    body.set("password", user.password);

    return this.http.post<any>(`${config.apiUrl}/login`, body, this.options)
      .pipe(
        tap(token => this.doLoginUser(user.username, token)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() {
    console.log("logout");
    this.doLogoutUser;
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  getLoggedUser(){
    return this.loggedUser;
  }

  private doLoginUser(username: string, token: Token) {
    this.loggedUser = username;
    console.log(token);
    this.storeToken(token);
  }

  private doLogoutUser() {
    this.loggedUser = "";
    this.removeToken();
  }

  private storeToken(token: Token) {
    localStorage.setItem(this.JWT_TOKEN, token.access_token);
  }

  private removeToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
