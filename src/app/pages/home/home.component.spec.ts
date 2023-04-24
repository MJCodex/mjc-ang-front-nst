import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FormBuilder } from "@angular/forms";
import { FightsCalculatorService } from "../../services/fights-calculator.service";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let fake_formBuilder: jasmine.SpyObj<FormBuilder>;
  let fake_flightsCalculator: jasmine.SpyObj<FightsCalculatorService>;

  beforeEach(waitForAsync(() => {
    fake_formBuilder = jasmine.createSpyObj<FormBuilder>('FormBuilder', ['group']);
    fake_flightsCalculator = jasmine.createSpyObj<FightsCalculatorService>('FightsCalculatorService', ['getAllDestinations']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: FormBuilder, useFactory: () => fake_formBuilder },
        { provide: FightsCalculatorService, useFactory: () => fake_flightsCalculator },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
