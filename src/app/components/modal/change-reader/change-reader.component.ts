import { Component, Input, OnDestroy } from '@angular/core';
import { ReaderService } from '../../../services/reader.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Reader } from '../../../models/reader';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-change-reader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-reader.component.html',
  styleUrl: './change-reader.component.css',
})
export class ChangeReaderComponent implements OnDestroy {
  @Input() closeModal!: any;
  destroySubject = new Subject<void>();

  updatedReader = {
    firstName: '',
    lastName: '',
    middleName: '',
    male: '',
    age: null,
    phoneNumber: '',
    adress: '',
  };

  constructor(private readerService: ReaderService) {}

  submitHandler() {
    let reader = this.readerService.getReader();
    if (reader) {
      let updatedReader: Reader = { ...reader, ...this.updatedReader };
      console.log(updatedReader);
      this.readerService
        .updateReader(updatedReader)
        .pipe(takeUntil(this.destroySubject))
        .subscribe((reader: Reader) => {
          if (reader) {
            this.readerService.setReader(reader);
            this.closeModal();
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
