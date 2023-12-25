import { Component, Input } from '@angular/core';
import { Book } from '../../../models/book';
import { BookCardComponent } from '../book-card/book-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books-preview-row',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './books-preview-row.component.html',
  styleUrl: './books-preview-row.component.css',
})
export class BooksPreviewRowComponent {
  @Input() books!: Book[];
  @Input() title!: string;
}
