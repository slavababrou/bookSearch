import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookSearchComponent } from '../book-search/book-search.component';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, BookSearchComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}
}
