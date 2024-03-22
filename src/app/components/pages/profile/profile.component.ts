import { AccountDeleteRequestService } from './../../../services/account-delete-request.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { Reader } from '../../../models/reader';
import { AuthService } from '../../../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReaderService } from './../../../services/reader.service';
import { ChangeReaderComponent } from '../../modal/change-reader/change-reader.component';
import { ChangePasswordComponent } from '../../modal/change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteService } from '../../../services/favorite.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ChangeReaderComponent, ChangePasswordComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  reader: Reader | null = null;
  isModalOpen: boolean | null = null;

  destroySubject = new Subject<void>();

  constructor(
    private authService: AuthService,
    private readerService: ReaderService,
    private router: Router,
    private accountDeleteRequestService: AccountDeleteRequestService,
    private matDialog: MatDialog,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((user) => (this.user = user));
    this.readerService
      .getReader()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reader) => (this.reader = reader));
  }

  public openModal(type: string) {
    if (type === 'password') this.matDialog.open(ChangePasswordComponent);
    else if (type === 'reader') this.matDialog.open(ChangeReaderComponent);
  }

  public deleteAccount() {
    if (confirm('Отправить запрос на удаление аккаунта?') && this.user) {
      this.accountDeleteRequestService
        .createRequest(this.user.id)
        .pipe(takeUntil(this.destroySubject))
        .subscribe((response) => {
          alert('Запрос успешно создан!');
          this.accountDeleteRequestService.pushDeleteRequest(response);
        });
    }
  }

  logout() {
    this.authService.logout();
    this.readerService.logoutReader();
    this.favoriteService.setFavorite([]);
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
