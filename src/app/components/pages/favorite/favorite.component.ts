import { BooksService } from './../../../services/books.service';
import { Subject, takeUntil } from 'rxjs';
import { Favorite } from '../../../models/favorite';
import { FavoriteService } from './../../../services/favorite.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksPreviewRowComponent } from '../../UI/books-preview-row/books-preview-row.component';
import { Book } from '../../../models/book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite',
  standalone: true,
  imports: [BooksPreviewRowComponent, CommonModule],
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.css',
})
export class FavoriteComponent implements OnInit, OnDestroy {
  favorites: Favorite[] | null = null;
  favoriteBooks: Book[] | null = null;
  destroySubject = new Subject<void>();
  favoriteBooksArray: Book[][] | null = null;

  constructor(
    private favoriteService: FavoriteService,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.favoriteService
      .getFavorite()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((favorites) => {
        if (favorites && favorites?.length) {
          this.booksService
            .fetchBooksById(favorites?.map((favorite) => favorite.bookId))
            .pipe(takeUntil(this.destroySubject))
            .subscribe((response) => {
              this.booksService.setFavoriteBooks(response);
              this.favoriteBooks = response;
              this.favoriteBooksArray =
                this.booksService.splitArrayIntoChunksOfLen(response, 4);
              console.log(this.favoriteBooksArray);
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
