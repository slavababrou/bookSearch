import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../../../models/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../../services/favorite.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent implements OnInit, OnDestroy {
  @Input() book!: Book;
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
            return favorite.bookId === this.book.id;
          });
        else this.isAded = false;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
