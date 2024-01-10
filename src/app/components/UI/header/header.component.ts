import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BookSearchComponent } from '../../book-search/book-search.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../../services/favorite.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, BookSearchComponent, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  favoriteCount: number | null = null;
  destroySubject = new Subject<void>();
  constructor(
    public authService: AuthService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.favoriteService
      .getFavorite()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((favorite) => {
        if (favorite) this.favoriteCount = favorite.length;
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
