import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { BookService } from '../../services/book.service';
import { BookCardComponent } from '../UI/book-card/book-card.component';
import { Book } from '../../models/book';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css',
})
export class BookSearchComponent implements OnDestroy {
  books: Book[] = [];
  destroySubject = new Subject<void>();
  constructor(private bookService: BookService) {}

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const query = target.value;

    if (query)
      this.bookService
        .searchBooks(query)
        .pipe(takeUntil(this.destroySubject))
        .subscribe((results) => {
          this.books = results;
        });
    else this.books = [];
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
