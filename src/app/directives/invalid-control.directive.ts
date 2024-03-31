import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[invalidControl]',
  standalone: true,
})
export class InvalidControlDirective {
  constructor(private el: ElementRef, private render: Renderer2) {
    this.render.setStyle(this.el.nativeElement, 'color', 'rgba(255, 70, 30)');
    this.render.setStyle(this.el.nativeElement, 'font-size', '12px');
  }
}
