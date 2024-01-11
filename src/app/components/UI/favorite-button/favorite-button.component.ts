import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Input } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FavoriteService } from '../../../services/favorite.service';
import { CommonModule } from '@angular/common';
import { ReaderService } from '../../../services/reader.service';

@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
  styleUrl: './favorite-button.component.css',
})
export class FavoriteButtonComponent implements OnInit, OnDestroy, OnChanges {
  @Input() bookId!: number;
  isAded: boolean | null = null;
  destroySubject = new Subject<void>();

  constructor(
    private favoriteService: FavoriteService,
    private readerService: ReaderService
  ) {}

  ngOnInit(): void {
    this.updateIsAded();
  }

  updateIsAded() {
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

  addFavorite() {
    let readerId;
    this.readerService
      .getReader()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reader) => {
        if (reader) readerId = reader.id;
      });

    if (readerId && this.bookId)
      this.favoriteService
        .addFavorite(readerId, this.bookId)
        .pipe(takeUntil(this.destroySubject))
        .subscribe((newFavorite) => {
          if (typeof newFavorite === 'number') {
            this.favoriteService.deleteFavorite(newFavorite);
          } else {
            this.favoriteService.pushFavorite(newFavorite);
          }
        });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bookId']) this.updateIsAded();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
