import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlightCardComponent } from './flight-card.component';

describe('FlightCardComponent', () => {
  let component: FlightCardComponent;
  let fixture: ComponentFixture<FlightCardComponent>;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      declarations: [FlightCardComponent],
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
