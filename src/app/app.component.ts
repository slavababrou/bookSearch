import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ReaderService } from './services/reader.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from './models/user';
import { Reader } from './models/reader';

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
    private readerService: ReaderService
  ) {}

  destroySubject = new Subject<void>();

  ngOnInit(): void {
    this.authService
      .autoLogin()
      ?.pipe(takeUntil(this.destroySubject))
      .subscribe((response: { user: User; reader: Reader | undefined }) => {
        if (response.user) {
          this.authService.setUser(response.user);
        }
        if (response.reader) this.readerService.setReader(response.reader);
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
