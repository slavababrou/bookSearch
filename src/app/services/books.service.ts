import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private newBooks: Book[] | undefined;
  private popularBooks: Book[] | undefined;
  private sameBooks: Book[] | undefined;

  private newBookApiUrl = 'http://localhost:3192/api/new-book';
  private popularBookApiUrl = 'http://localhost:3192/api/popular-book';
  private sameBookApiUrl = 'http://localhost:3192/api/same-book';

  constructor(private http: HttpClient) {}

  setNewBooks(books: Book[]) {
    this.newBooks = books;
  }
  setPopularBooks(books: Book[]) {
    this.popularBooks = books;
  }
  setSameBooks(books: Book[]) {
    this.sameBooks = books;
  }
  getNewBooks() {
    return this.newBooks;
  }
  getPopularBooks() {
    return this.popularBooks;
  }
  getSameBooks() {
    return this.sameBooks;
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

  fetchSameBooks() {
    return this.http.get<Book[]>(`${this.popularBookApiUrl}`, {
      params: {
        limit: 5,
        page: 1,
      },
    });
  }
}
