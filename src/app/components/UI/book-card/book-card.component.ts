import { Component, Input, OnDestroy } from '@angular/core';
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
export class BookCardComponent implements OnDestroy {
  @Input() book!: Book;
  destroySubject = new Subject<void>();
  constructor(private favoriteService: FavoriteService) {}

  addFavorite() {
    this.favoriteService
      .addFavorite(1, this.book.id)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((resolve) => {
        typeof resolve === 'string' ? alert(resolve) : 1;
        //: this.favoriteService.pushFavorite(resolve);
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
