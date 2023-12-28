import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Book } from '../../../models/book';
import { BookService } from '../../../services/book.service';
import { Subject, takeUntil } from 'rxjs';
import { BooksPreviewRowComponent } from '../../UI/books-preview-row/books-preview-row.component';
import { BooksService } from '../../../services/books.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, BooksPreviewRowComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
  schemas: [NO_ERRORS_SCHEMA],
})
export class BookComponent implements OnInit, OnDestroy {
  id: number | null = null;
  book: Book | null = null;
  sameBooks: Book[] | null = null;

  destroySubject = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroySubject))
      .subscribe((params) => {
        this.id = +params['id'].slice(1);

        if (this.id) {
          this.bookService
            .fetchBook(this.id)
            .pipe(takeUntil(this.destroySubject))
            .subscribe((book: Book) => (this.book = book));

          this.booksService
            .fetchSameBooks()
            .pipe(takeUntil(this.destroySubject))
            .subscribe((books: Book[]) => (this.sameBooks = books));
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
