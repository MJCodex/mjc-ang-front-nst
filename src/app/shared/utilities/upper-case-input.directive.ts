import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';
import {DefaultValueAccessor} from "@angular/forms";

@Directive({
  selector: 'input[toUppercase]',
  standalone: true
})
export class UpperCaseInputDirective extends DefaultValueAccessor {
  @HostListener('input', ['$event']) input($event: InputEvent): void {
    const target: HTMLInputElement = $event.target as HTMLInputElement;
    const start: number | null = target.selectionStart;

    target.value = target.value.toUpperCase();
    target.setSelectionRange(start, start);

    this.onChange(target.value);
  }

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    super(renderer, elementRef, false);
  }
}
