import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightCardComponent } from './flight-card.component';
import {MatCardModule} from "@angular/material/card";
import {CurrencyChangePipe} from "../../shared/pipes/currency-change.pipe";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('FlightCardComponent', () => {
  let component: FlightCardComponent;
  let fixture: ComponentFixture<FlightCardComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [FlightCardComponent],
      imports: [
        MatCardModule,
        CurrencyChangePipe,
        HttpClientTestingModule
      ],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
