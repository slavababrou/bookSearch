import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Reader } from '../models/reader';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | null>(null);
  private apiUrl = 'http://localhost:3192/api/user';

  constructor(private http: HttpClient) {}

  setUser(user: User) {
    this.user.next(user);
  }

  getUser() {
    return this.user.asObservable();
  }

  isLoggedIn() {
    return !!this.user.getValue();
  }

  login(username: string, password: string) {
    return this.http.post<{
      token: string;
      user: User;
      reader: Reader | undefined;
    }>(`${this.apiUrl}/login`, {
      username,
      email: username,
      password,
    });
  }

  logout() {
    this.user.next(null);
    localStorage.clear();
  }

  autoLogin() {
    const token: string | null = localStorage.getItem('accessToken');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.get<{ user: User; reader: Reader | undefined }>(
        `${this.apiUrl}/auto-login`,
        { headers }
      );
    }
    return;
  }

  register(username: string, email: string, password: string) {
    return this.http.post<{ token: string; user: User; reader: Reader }>(
      `${this.apiUrl}/register`,
      {
        username,
        email,
        password,
      }
    );
  }

  changePassword(
    oldPassword: string,
    newFirstPassword: string,
    newSecondPassword: string
  ) {
    const token: string | null = localStorage.getItem('accessToken');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.put<{ response: string }>(
        `${this.apiUrl}`,
        { oldPassword, newFirstPassword, newSecondPassword },
        {
          headers,
        }
      );
    }
    return;
  }
}
