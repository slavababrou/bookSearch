import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readerInfo',
  standalone: true,
})
export class ReaderInfoPipe implements PipeTransform {
  transform(info: string | number | null | undefined): string | number {
    return info ? info : 'Не задан';
  }
}
