import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Reader } from '../models/reader';
import { BehaviorSubject, of, Observable } from 'rxjs';
import { AutoLogin } from '../models/autoLogin';

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

  getRole() {
    const user = this.user.getValue();
    switch (user?.roleId) {
      case 1:
        return 'admin';
      case 2:
        return 'librarian';
      case 3:
        return 'reader';
      default:
        return 'guest';
    }
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

  autoLogin(): Observable<AutoLogin | null> {
    const token: string | null = localStorage.getItem('accessToken');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.get<AutoLogin>(`${this.apiUrl}/auto-login`, { headers });
    }
    return of(null);
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
      return this.http.put<{ message: string }>(
        `${this.apiUrl}/updatePassword`,
        { oldPassword, newFirstPassword, newSecondPassword },
        {
          headers,
        }
      );
    }
    return;
  }
}
