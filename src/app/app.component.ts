import { FavoriteService } from './services/favorite.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ReaderService } from './services/reader.service';
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import { AutoLogin } from './models/autoLogin';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private readerService: ReaderService,
    private favoriteService: FavoriteService
  ) {}

  destroySubject = new Subject<void>();

  ngOnInit(): void {
    this.authService
      .autoLogin()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((response: AutoLogin | null) => {
        if (response && response.user) {
          this.authService.setUser(response.user);
          if (response.reader) {
            this.readerService.setReader(response.reader);
            this.favoriteService
              .fetchFavorite(response.reader.id!)
              .pipe(takeUntil(this.destroySubject))
              .subscribe((favorites) => {
                if (favorites) this.favoriteService.setFavorite(favorites);
              });
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
