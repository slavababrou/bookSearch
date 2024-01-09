import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookCardComponent } from '../UI/book-card/book-card.component';
import { Book } from '../../models/book';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, BookCardComponent, FormsModule, RouterLink],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css',
})
export class BookSearchComponent implements OnDestroy {
  books: Book[] = [];
  destroySubject = new Subject<void>();
  @Input() query: string = '';

  constructor(private bookService: BookService) {}

  onInput() {
    if (this.query)
      this.bookService
        .searchBooks(this.query)
        .pipe(takeUntil(this.destroySubject))
        .subscribe((results) => {
          this.books = results;
        });
    else this.books = [];
  }

  onBlur() {
    setTimeout(() => {
      this.books = [];
      this.query = '';
    }, 100);
    //
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
