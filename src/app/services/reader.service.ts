import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reader } from '../models/reader';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  private reader: Reader | null = null;
  private apiUrl = 'http://localhost:3192/api/reader';

  constructor(private http: HttpClient) {}

  setReader(reader: Reader) {
    this.reader = reader;
  }

  getReader() {
    return this.reader;
  }

  logoutReader() {
    this.reader = null;
  }

  createReader(userId: number) {
    return this.http.post<Reader>(`${this.apiUrl}`, { userId });
  }
}
