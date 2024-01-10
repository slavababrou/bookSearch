import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reader } from '../models/reader';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  private reader = new BehaviorSubject<Reader | null>(null);
  private apiUrl = 'http://localhost:3192/api/reader';

  constructor(private http: HttpClient) {}

  setReader(reader: Reader) {
    this.reader.next(reader);
  }

  getReader() {
    return this.reader.asObservable();
  }

  getReaderId() {
    return this.reader.getValue()?.id;
  }

  logoutReader() {
    this.reader.next(null);
  }

  createReader(userId: number) {
    return this.http.post<Reader>(`${this.apiUrl}`, { userId });
  }

  updateReader(reader: Reader) {
    return this.http.put<Reader>(`${this.apiUrl}`, reader);
  }
}
