import { AuthService } from '../../../services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormsModule,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RouterLink } from '@angular/router';
import { User } from '../../../models/user';
import { Reader } from '../../../models/reader';
import { ReaderService } from '../../../services/reader.service';
import { FavoriteService } from '../../../services/favorite.service';
import { InvalidControlDirective } from '../../../directives/invalid-control.directive';
// email
// checkRegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
function checkRegExp(regExp: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = regExp.test(control.value);
    return !forbidden ? { forbiddenValue: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    InvalidControlDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    rememberMe: [true],
  });
  destrouSubject = new Subject<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private readerService: ReaderService,
    private favoriteService: FavoriteService,
    private formBuilder: FormBuilder
  ) {}

  login(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    const rememberMe = this.loginForm.get('rememberMe')?.value;

    if (username && password)
      this.authService
        .login(username, password)
        .pipe(takeUntil(this.destrouSubject))
        .subscribe(
          (response: {
            token: string;
            user: User;
            reader: Reader | undefined;
          }) => {
            if (response?.token && response?.user) {
              if (rememberMe) this.authService.setAccessToken(response.token);
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
