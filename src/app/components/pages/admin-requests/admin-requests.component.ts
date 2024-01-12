import { AuthService } from './../../../services/auth.service';
import { accountDeleteRequest } from './../../../models/account-delete-request';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AccountDeleteRequestService } from '../../../services/account-delete-request.service';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-admin-requests',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-requests.component.html',
  styleUrl: './admin-requests.component.css',
})
export class AdminRequestsComponent implements OnInit, OnDestroy {
  deleteAccountRequests: accountDeleteRequest[] | null = null;
  destroySubject = new Subject<void>();

  createLibrarianForm!: FormGroup;

  constructor(
    private accountDeleteRequestService: AccountDeleteRequestService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.accountDeleteRequestService
      .fetchRequests()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((response) => {
        if (response) this.deleteAccountRequests = response;
      });

    this.createLibrarianForm = this.formBuilder.group({
      username: [''],
      email: [''],
      password: [''],
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

  createLibrarian() {
    this.adminService
      .createLibrarian(this.createLibrarianForm.value)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((response) => {
        response
          ? alert('Библиотекарь успешно создан')
          : alert('Не удалось создать библиотекаря');
      });
  }

  logout() {
    this.router.navigate(['./register']);
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
