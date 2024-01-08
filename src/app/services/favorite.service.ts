import { Injectable } from '@angular/core';
import { Favorite } from '../models/favorite';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private _favorite: Favorite[] | null = null;
  private apiUrl = 'http://localhost:3192/api/favorite';

  constructor(private http: HttpClient) {}

  get favorite(): Favorite[] | null {
    return this._favorite;
  }

  set favorite(favorite: Favorite[]) {
    this._favorite = favorite;
  }

  addFavorite(readerId: number, bookId: number) {
    return this.http.post<Favorite | { message: string }>(this.apiUrl, {
      readerId,
      bookId,
    });
  }

  pushFavorite(favorite: Favorite) {
    this._favorite?.push(favorite);
  }
}
