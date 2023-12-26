import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalog-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog-section.component.html',
  styleUrl: './catalog-section.component.css',
})
export class CatalogSectionComponent {
  catalogList: string[] = [
    'Фантастика',
    'Наука',
    'Электроника',
    'Программирование',
    'Классика',
    'Приключения',
    'Энциклопедии',
    'Комиксы',
    'Библия',
  ];
}
