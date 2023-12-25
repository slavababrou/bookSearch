import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private newBooks: Book[] | null = null;
  private popularBooks: Book[] | null = null;

  private newBookApiUrl = 'http://localhost:3192/api/new-book';
  private popularBookApiUrl = 'http://localhost:3192/api/popular-book';

  constructor(private http: HttpClient) {}

  setNewBooks(books: Book[]) {
    this.newBooks = books;
  }
  setPopularBooks(books: Book[]) {
    this.popularBooks = books;
  }
  getNewBooks() {
    return this.newBooks;
  }
  getPopularBooks() {
    return this.popularBooks;
  }

  fetchNewBooks() {
    return this.http.get<Book[]>(`${this.newBookApiUrl}`, {
      params: {
        limit: 5,
        page: 1,
      },
    });
  }

  fetchPopularBooks() {
    return this.http.get<Book[]>(`${this.popularBookApiUrl}`, {
      params: {
        limit: 5,
        page: 1,
      },
    });
  }
}
