import { Injectable } from '@angular/core';
import { Favorite } from '../models/favorite';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favorite = new BehaviorSubject<Favorite[] | null>(null);
  private apiUrl = 'http://localhost:3192/api/favorite';

  constructor(private http: HttpClient) {}

  getFavorite() {
    return this.favorite.asObservable();
  }

  setFavorite(favorites: Favorite[]) {
    this.favorite.next(favorites);
  }

  pushFavorite(favorite: Favorite) {
    let currentFavorites = this.favorite.getValue();
    if (currentFavorites) this.favorite.next([...currentFavorites, favorite]);
    else this.favorite.next([favorite]);
  }

  addFavorite(readerId: number, bookId: number) {
    return this.http.post<Favorite | number>(this.apiUrl, {
      readerId,
      bookId,
    });
  }

  deleteFavorite(id: number) {
    const currentFavorites = this.favorite.getValue();
    if (currentFavorites) {
      const updatedFavorites = currentFavorites.filter(
        (favorite) => favorite.id !== id
      );
      this.favorite.next(updatedFavorites);
    }
  }

  fetchFavorite(readerId: number) {
    return this.http.get<Favorite[]>(
      `${this.apiUrl}/getByReaderId?readerId=${readerId}`
    );
  }
}
