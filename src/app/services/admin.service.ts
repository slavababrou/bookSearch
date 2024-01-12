import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Librarian } from '../models/librarian';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = 'http://localhost:3192/api';
  constructor(private http: HttpClient) {}

  createLibrarian(librarian: Librarian): Observable<boolean> {
    return this.http.post<boolean>(
      `${this.apiUrl}/user/create-librarian`,
      librarian
    );
  }
}
