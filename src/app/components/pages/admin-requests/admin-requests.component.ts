import { accountDeleteRequest } from './../../../models/account-delete-request';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountDeleteRequestService } from '../../../services/account-delete-request.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-requests.component.html',
  styleUrl: './admin-requests.component.css',
})
export class AdminRequestsComponent implements OnInit, OnDestroy {
  deleteAccountRequests: accountDeleteRequest[] | null = null;
  destroySubject = new Subject<void>();

  constructor(
    private accountDeleteRequestService: AccountDeleteRequestService
  ) {}

  ngOnInit(): void {
    this.accountDeleteRequestService
      .fetchRequests()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((response) => {
        if (response) this.deleteAccountRequests = response;
      });
  }

  acceptRequest(id: number) {
    this.accountDeleteRequestService
      .acceptRequest(id)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((response) => {
        if (response && this.deleteAccountRequests) {
          alert(response);
          this.deleteAccountRequests = this.deleteAccountRequests.filter(
            (item) => item.id != id
          );
        }
      });
  }

  declineRequest(id: number) {
    this.accountDeleteRequestService
      .declineRequest(id)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((response) => {
        if (response && this.deleteAccountRequests) {
          alert(response);
          this.deleteAccountRequests = this.deleteAccountRequests.filter(
            (item) => item.id != id
          );
        }
      });
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
