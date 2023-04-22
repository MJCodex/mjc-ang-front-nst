import { TestBed } from '@angular/core/testing';

import { FightsCalculatorService } from './fights-calculator.service';

describe('FightsCalculatorService', () => {
  let service: FightsCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FightsCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
