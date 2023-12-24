import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3192/api/user';

  constructor(private http: HttpClient) {}

  fetchUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  fetchUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
