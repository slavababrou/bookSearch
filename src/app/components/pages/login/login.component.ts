import { AuthService } from '../../../services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { Reader } from '../../../models/reader';
import { ReaderService } from '../../../services/reader.service';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  username: string = '';
  password: string = '';
  rememberMe: boolean = true;

  destrouSubject = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private readerService: ReaderService,
    private favoriteService: FavoriteService
  ) {}

  login(): void {
    this.authService
      .login(this.username, this.password)
      .pipe(takeUntil(this.destrouSubject))
      .subscribe(
        (response: {
          token: string;
          user: User;
          reader: Reader | undefined;
        }) => {
          if (response && response.token && response.user) {
            localStorage.setItem('accessToken', response.token);
            this.authService.setUser(response.user);

            if (response.reader) {
              this.readerService.setReader(response.reader);
              this.favoriteService
                .fetchFavorite(response.reader.id!)
                .pipe(takeUntil(this.destrouSubject))
                .subscribe((favorite) => {
                  this.favoriteService.setFavorite(favorite);
                  this.router.navigate(['/']);
                });
            } else this.router.navigate(['/requests']);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destrouSubject.next();
    this.destrouSubject.complete();
  }
}
