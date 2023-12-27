import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:3192/api/book';

  constructor(private http: HttpClient) {}

  searchBooks(query: string) {
    return this.http.get<Book[]>(`${this.apiUrl}/search`, {
      params: {
        query: query,
      },
    });
  }

  fetchBook(id: number) {
    return this.http.get<Book>(`${this.apiUrl}/${id}`);
  }
}
