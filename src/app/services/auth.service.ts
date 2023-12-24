import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | null = null;
  private apiUrl = 'http://localhost:3192/api/user';

  constructor(private http: HttpClient) {}

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return !!this.user;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, {
      username,
      email: username,
      password,
    });
  }

  logout() {
    this.user = null;
    localStorage.clear();
  }

  autoLogin() {
    const token: string | null = localStorage.getItem('accessToken');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.get<any>(`${this.apiUrl}/auto-login`, { headers });
    }
    return;
  }

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/register`, {
      username,
      email,
      password,
    });
  }
}
