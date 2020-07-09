import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8080/';
  users: IUser[] = undefined;

  constructor(private http: HttpClient) {}

  getUsers() {
    const authPromise = new Promise((res, rej) => {
      this.http
        .get<IUser[]>(`${this.url}getAllUsers`)
        .subscribe((response: IUser[]) => {
          if (response) {
            this.users = response;
            res(true);
          } else {
            res(false);
          }
        });
    });
    return authPromise;
  }

  getAllUsers(): Observable<User[]> {
    // returns list containing all users
    return this.http.get<IUser[]>(`${this.url}getAllUsers`);
  }

  getUserByUsername(username: string): Observable<IUser> {
    return of(this.users.find((user) => user.username === username));
  }

  register(user: User) {
    return this.registerCall(user);
  }

  registerCall(user) {
    return this.http.post<IUser>(`${this.url}registerUser`, user);
  }

  editUser(user: IUser) {
    return new Promise((res, rej) => {
      this.http.post<HttpResponse<any>>(`${this.url}editUser`, user).subscribe(
        (response: HttpResponse<any>) => {
          if (response) {
            res(response);
          }
        },
        (err: HttpErrorResponse) => {
          rej(err);
        }
      );
    });
  }

  editUserRole(user) {
    // returns user object after role has successfully been changed
    return this.http.post<IUser>(`${this.url}editUserRole`, user);
  }

  deleteUserById(userId) {
    // deletes user via the id, string that is returned is the id
    return this.http.post<string>(`${this.url}deleteUserById`, userId);
  }
}
