import { AuthService } from '../../../services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

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

  destrouSubject = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService
      .login(this.username, this.password)
      .pipe(takeUntil(this.destrouSubject))
      .subscribe((response: any) => {
        if (response && response.token && response.user) {
          localStorage.setItem('accessToken', response.token);
          this.authService.setUser(response.user);
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    this.destrouSubject.next();
    this.destrouSubject.complete();
  }
}
