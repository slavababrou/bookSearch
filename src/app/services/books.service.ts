import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private newBooks!: Book[];
  private popularBooks!: Book[];
  private sameBooks!: Book[];
  private favoriteBooks = new BehaviorSubject<Book[] | null>(null);

  private apiUrl = 'http://localhost:3192/api/book';
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

  setFavoriteBooks(favoriteBooks: Book[]) {
    this.favoriteBooks.next(favoriteBooks);
  }
  getFavoriteBooks() {
    return this.favoriteBooks.asObservable();
  }

  fetchNewBooks() {
    return this.http.get<Book[]>(`${this.newBookApiUrl}`, {
      params: {
        limit: 4,
        page: 1,
      },
    });
  }

  fetchPopularBooks() {
    return this.http.get<Book[]>(`${this.popularBookApiUrl}`, {
      params: {
        limit: 4,
        page: 1,
      },
    });
  }

  fetchSameBooks() {
    return this.http.get<Book[]>(`${this.popularBookApiUrl}`, {
      params: {
        limit: 4,
        page: 1,
      },
    });
  }

  fetchBooksById(ids: number[]) {
    return this.http.get<Book[]>(
      `${this.apiUrl}/getBooksById?ids=${ids.join('&ids=')}`
    );
  }

  splitArrayIntoChunksOfLen(arr: Book[], len: number) {
    var chunks = [],
      i = 0,
      n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, (i += len)));
    }
    return chunks;
  }
}
