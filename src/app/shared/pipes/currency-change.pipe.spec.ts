import {CurrencyChangePipe} from "./currency-change.pipe";
import {CurrencyService} from "../../services/currency.service";

let currencyService: CurrencyService;

describe('CurrencyChangePipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyChangePipe(currencyService);
    expect(pipe).toBeTruthy();
  });
});
