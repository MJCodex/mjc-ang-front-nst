import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public currency = {symbol: 'USD', value: 1};

  currency$: BehaviorSubject<any> = new BehaviorSubject<any>(this.currency);

  constructor(
    private _http: HttpClient
  ) {
  }

  setCurrency(symbol: string, value: number): void {
    const data = {
      symbol,
      value
    };

    localStorage.setItem('__currency', JSON.stringify({symbol, value}));

    this.currency$.next(data);
  }

  getCurrencies(): Observable<any> {
    return this._http.get('https://v1.nocodeapi.com/leifermendez/cx/EWBnLVhPRyGHNdDn/rates');
  }


}
