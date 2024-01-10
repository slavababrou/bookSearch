import { Component, Input } from '@angular/core';
import { Book } from '../../../models/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FavoriteButtonComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
})
export class BookCardComponent {
  @Input() book!: Book;
}
