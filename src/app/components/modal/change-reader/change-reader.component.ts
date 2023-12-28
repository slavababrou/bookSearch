import { Reader } from './../../../models/reader';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReaderService } from '../../../services/reader.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-change-reader',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './change-reader.component.html',
  styleUrl: './change-reader.component.css',
})
export class ChangeReaderComponent implements OnDestroy, OnInit {
  reader: Reader | null = null;
  readerForm!: FormGroup;

  destroySubject = new Subject<void>();

  constructor(
    private readerService: ReaderService,
    private modalService: ModalService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.readerService
      .getReader()
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reader) => (this.reader = reader));

    this.readerForm = this.formBuilder.group({
      firstName: [this.reader?.firstName],
      lastName: [this.reader?.lastName],
      middleName: [this.reader?.middleName],
      phoneNumber: [this.reader?.phoneNumber],
      male: [this.reader?.male],
      age: [this.reader?.age],
      adress: [this.reader?.adress],
      id: [this.reader?.id],
    });
  }

  submitHandler() {
    this.readerService
      .updateReader(this.readerForm.value)
      .pipe(takeUntil(this.destroySubject))
      .subscribe((reader) => {
        this.readerService.setReader(reader);
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
