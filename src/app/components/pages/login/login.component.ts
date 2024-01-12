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
    private readerService: ReaderService
  ) {}

  login() {
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

            if (response.user.roleId === 1) this.router.navigate(['/requests']);
            else if (response.user.roleId === 3) this.router.navigate(['/']);

            if (response.reader) this.readerService.setReader(response.reader);
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destrouSubject.next();
    this.destrouSubject.complete();
  }
}
