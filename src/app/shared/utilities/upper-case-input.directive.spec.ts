import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { UpperCaseInputDirective } from './upper-case-input.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('UpperCaseInputDirective', () => {
  let directive: UpperCaseInputDirective;
  let fixture: ComponentFixture<UpperCaseInputDirective>;
  let fakeRenderer: jasmine.SpyObj<Renderer2>;
  let fakeElementRef: jasmine.SpyObj<ElementRef>;

  beforeEach(waitForAsync(() => {
    fakeRenderer = jasmine.createSpyObj<Renderer2>('Renderer2', []);
    fakeElementRef = jasmine.createSpyObj<ElementRef>('ElementRef', []);

    TestBed.configureTestingModule({
      declarations: [UpperCaseInputDirective],
      providers: [
        { provide: Renderer2, useFactory: () => fakeRenderer },
        { provide: ElementRef, useFactory: () => fakeElementRef },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperCaseInputDirective);
    directive = fixture.componentInstance;
  });

  it('should create', () => {
    expect(directive).toBeTruthy();
  });

});
