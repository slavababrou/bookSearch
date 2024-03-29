import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Subject, finalize, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  changePasswordForm!: FormGroup;
  destroySubject = new Subject<void>();

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null],
      newFirstPassword: [null],
      newSecondPassword: [null],
    });
  }

  onSubmit() {
    const { oldPassword, newFirstPassword, newSecondPassword } =
      this.changePasswordForm.value;

    this.authService
      .changePassword(oldPassword, newFirstPassword, newSecondPassword)
      ?.pipe(
        takeUntil(this.destroySubject),
        finalize(() => this.closeModal())
      )
      .subscribe({
        next: (response) => {
          alert(response?.message);
        },
        error: (err) => {
          alert(err.error.message);
        },
      });
  }

  closeModal() {
    this.matDialog.closeAll();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
