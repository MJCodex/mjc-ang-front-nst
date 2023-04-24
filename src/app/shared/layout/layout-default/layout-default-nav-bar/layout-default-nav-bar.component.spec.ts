import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutDefaultNavBarComponent } from './layout-default-nav-bar.component';
import { CurrencyService } from "../../../../services/currency.service";

describe('LayoutDefaultNavBarComponent', () => {
  let component: LayoutDefaultNavBarComponent;
  let fixture: ComponentFixture<LayoutDefaultNavBarComponent>;
  let fake_currencyService: jasmine.SpyObj<CurrencyService>;

  beforeEach(waitForAsync(() => {
    fake_currencyService = jasmine.createSpyObj<CurrencyService>('CurrencyService', ['setCurrency', 'getCurrencies']);

    TestBed.configureTestingModule({
      declarations: [LayoutDefaultNavBarComponent],
      providers: [
        { provide: CurrencyService, useFactory: () => fake_currencyService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutDefaultNavBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
