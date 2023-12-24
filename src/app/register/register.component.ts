import { AuthService } from './../auth.service';
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  username: string = '';
  email: string = '';
  password: string = '';

  destrouSubject = new Subject<void>();

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .register(this.username, this.email, this.password)
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
