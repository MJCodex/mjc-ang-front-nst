import {UpperCaseInputDirective} from "./upper-case-input.directive";
import {ElementRef, Renderer2} from "@angular/core";

let _renderer2: Renderer2;
let _elementRef: ElementRef;

describe('UpperCaseInputDirective', () => {
  it('should create an instance', () => {
    const directive = new UpperCaseInputDirective(_renderer2, _elementRef);
    expect(directive).toBeTruthy();
  });
});
