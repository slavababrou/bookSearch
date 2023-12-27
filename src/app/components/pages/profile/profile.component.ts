import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReaderService } from './../../../services/reader.service';
import { User } from '../../../models/user';
import { Reader } from '../../../models/reader';
import { CommonModule } from '@angular/common';
import { ChangeReaderComponent } from '../../modal/change-reader/change-reader.component';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ChangeReaderComponent],
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
    private modalService: ModalService
  ) {}

  logout() {
    this.authService.logout();
    this.readerService.logoutReader();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.authService
      .getUser()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((user) => (this.user = user));
    this.readerService
      .getReader()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reader) => (this.reader = reader));
    this.modalService.isOpen$
      .pipe(takeUntil(this.destroySubject))
      .subscribe((isModalOpen) => (this.isModalOpen = isModalOpen));
  }

  public openModal() {
    this.modalService.openModal();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
