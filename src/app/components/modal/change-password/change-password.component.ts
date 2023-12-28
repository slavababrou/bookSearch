import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AuthService } from '../../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
    private modalService: ModalService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null],
      newFirstPassword: [null],
      newSecondPassword: [null],
    });
  }

  onSubmit() {
    const [oldPassword, newFirstPassword, newSecondPassword] =
      this.changePasswordForm.value;
    this.authService
      .changePassword(oldPassword, newFirstPassword, newSecondPassword)
      ?.pipe(takeUntil(this.destroySubject))
      .subscribe((isSuccsess) => {
        alert(isSuccsess);
        this.modalService.closeModal();
      });
  }

  closeModal() {
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
