import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FavoriteService } from '../../../services/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.css',
})
export class FavoriteButtonComponent {
  @Input() bookId!: number;
  isAded: boolean | null = null;
  destroySubject = new Subject<void>();

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit(): void {
    this.favoriteService
      .getFavorite()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((favorites) => {
        if (favorites)
          this.isAded = favorites.some((favorite) => {
            return favorite.bookId === this.bookId;
          });
        else this.isAded = false;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
