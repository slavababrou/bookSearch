import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksPreviewRowComponent } from '../../UI/books-preview-row/books-preview-row.component';
import { BooksService } from '../../../services/books.service';
import { Book } from '../../../models/book';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CatalogSectionComponent } from '../../UI/catalog-section/catalog-section.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BooksPreviewRowComponent,
    CommonModule,
    RouterLink,
    CatalogSectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  newBooks: Book[] | null = null;
  popularBooks: Book[] | null = null;
  destroySubject = new Subject<void>();

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService
      .fetchNewBooks()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((newBooks) => {
        if (newBooks.length) this.newBooks = newBooks;
      });

    this.booksService
      .fetchPopularBooks()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((popularBooks) => {
        if (popularBooks.length) this.popularBooks = popularBooks;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
