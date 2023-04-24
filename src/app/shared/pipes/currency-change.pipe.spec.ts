import { CurrencyChangePipe } from './currency-change.pipe';
import { CurrencyService } from "../../services/currency.service";

describe('CurrencyChangePipe', () => {
  let pipe: CurrencyChangePipe;
  let fakeCurrencyService: jasmine.SpyObj<CurrencyService>;

  function createPipe() {
    pipe = new CurrencyChangePipe(
      fakeCurrencyService,
    );
  }

  beforeEach(() => {
    fakeCurrencyService = jasmine.createSpyObj<CurrencyService>('CurrencyService', []);

    createPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

});
