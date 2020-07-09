import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import { IUser, UserApiResponse } from '../interfaces/user';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8080/';
  loggedIn: boolean = false;
  isAdmin: boolean = false;

  jwtHelper: JwtHelperService = new JwtHelperService();
  currentUser: User = new User();

  constructor(private router: Router, private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedUser = this.decodeUserFromToken(token);
      this.setCurrentUser(decodedUser);
    }
  }

  decodeUserFromToken(token) {
    return this.jwtHelper.decodeToken(token).user;
  }

  setCurrentUser(decodedUser) {
    this.loggedIn = true;
    this.currentUser._id = decodedUser._id;
    this.currentUser.username = decodedUser.username;
    this.currentUser.email = decodedUser.email;
    this.currentUser.role = decodedUser.role;
    decodedUser.role === 'admin'
      ? (this.isAdmin = true)
      : (this.isAdmin = false);
  }

  login(credentials): Observable<UserApiResponse> {
    const observ = this.http
      .post<UserApiResponse>(`${this.url}login`, credentials)
      .pipe(share());
    observ.subscribe((res) => {
      localStorage.setItem('token', res.token);
      this.setCurrentUser(this.decodeUserFromToken(res.token));
    });
    return observ;
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.isAdmin = false;
    this.currentUser = new User();
    this.router.navigate(['']);
  }

  isAuthenticated() {
    return (
      localStorage.getItem('token') !== null &&
      !this.jwtHelper.isTokenExpired(localStorage.getItem('token')) &&
      !!this.currentUser
    );
  }
}
