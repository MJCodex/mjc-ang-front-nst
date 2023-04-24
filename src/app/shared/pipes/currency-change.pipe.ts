import {OnDestroy, Pipe, PipeTransform} from '@angular/core';
import {Subscription} from 'rxjs';
import {CurrencyService} from "../../services/currency.service";

@Pipe({
  standalone: true,
  name: 'currencyChange',
  pure: false
})
export class CurrencyChangePipe implements PipeTransform, OnDestroy {
  public value: string = '';
  private listen$: Array<Subscription> = [];

  constructor(
    private currencyService: CurrencyService
  ) { }

  transform(valueIn: number): any {

    const observer$: Subscription = this.currencyService.currency$
      .subscribe(({symbol, value}): void => {
        this.value = `${(valueIn * value).toFixed(2)} ${symbol}`;
      })

    this.listen$ = [observer$];

    return this.value;
  }

  ngOnDestroy(): void {
    this.listen$.forEach((observer: Subscription) => observer.unsubscribe());
  }

}
