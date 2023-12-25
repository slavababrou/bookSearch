import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ReaderService } from './../../../services/reader.service';
import { User } from '../../../models/user';
import { Reader } from '../../../models/reader';
import { CommonModule } from '@angular/common';
import { ChangeReaderComponent } from '../../modal/change-reader/change-reader.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ChangeReaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  reader: Reader | null = null;

  isModalOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private readerService: ReaderService
  ) {}

  logout() {
    this.authService.logout();
    this.readerService.logoutReader();
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.reader = this.readerService.getReader();
  }

  public openModal() {
    this.isModalOpen = true;
  }

  public closeModal() {
    this.isModalOpen = false;
  }
}
