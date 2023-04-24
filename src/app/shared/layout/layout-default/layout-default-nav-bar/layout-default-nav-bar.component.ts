import {Component, OnInit} from '@angular/core';
import {CurrencyService} from "../../../../services/currency.service";

@Component({
  selector: 'app-layout-default-nav-bar',
  templateUrl: './layout-default-nav-bar.component.html',
  styleUrls: ['./layout-default-nav-bar.component.scss']
})
export class LayoutDefaultNavBarComponent implements OnInit {
  public currencies: Array<any> = []
  public displayedCurrencies: string[] = ['COP', 'MXN', 'USD'];

  constructor(
    private _currencyService: CurrencyService
  ) {
  }

  ngOnInit(): void {
    this.getCurrencies();
  }

  setCurrency(symbol: string, value: number): void {
    this._currencyService.setCurrency(symbol, value)
  }

  getCurrencies(): void {
    this._currencyService.getCurrencies().subscribe(({rates}): void => {

      this.currencies = Object.values(rates).map((value: any, index: number): { symbol: string, value: any } => {
        return {
          symbol: Object.keys(rates)[index],
          value
        }
      })
    })
  }
}
