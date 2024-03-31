import { AuthService } from '../../../services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  map,
  switchMap,
  takeUntil,
  timer,
} from 'rxjs';
import { RouterLink } from '@angular/router';
import { ReaderService } from '../../../services/reader.service';
import { User } from '../../../models/user';
import { Reader } from '../../../models/reader';
import { FavoriteService } from '../../../services/favorite.service';
import { ValidationService } from '../../../services/validation.service';
import { InvalidControlDirective } from '../../../directives/invalid-control.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    InvalidControlDirective,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  registerForm = this.fb.group({
    username: ['', , this.usernameAsyncValidator.bind(this)],
    email: ['', , this.emailAsyncValidator.bind(this)],
    password: [''],
  });

  destrouSubject = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private readerService: ReaderService,
    private favoriteService: FavoriteService,
    private fb: FormBuilder,
    private validationService: ValidationService
  ) {}

  register() {
    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    if (username && password && email)
      this.authService
        .register(username, email, password)
        .pipe(takeUntil(this.destrouSubject))
        .subscribe(
          (response: { token: string; user: User; reader: Reader }) => {
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
              }
            }
          }
        );
  }

  emailAsyncValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(1500).pipe(
      switchMap(() => {
        const email = control.value;
        return this.validationService.isEmailUnique(email);
      }),
      map((isUnique) => {
        return isUnique ? null : { emailNotUnique: true };
      })
    );
  }

  usernameAsyncValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(1500).pipe(
      switchMap(() => {
        const username = control.value;
        return this.validationService.isUsernameUnique(username);
      }),
      map((isUnique) => {
        return isUnique ? null : { usernameNotUnique: true };
      })
    );
  }

  ngOnDestroy(): void {
    this.destrouSubject.next();
    this.destrouSubject.complete();
  }
}
