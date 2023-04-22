import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-flight-card',
  templateUrl: './flight-card.component.html',
  styleUrls: ['./flight-card.component.scss']
})
export class FlightCardComponent {
  @Input() paths!: any[];

  get flightPrice(): number {
    let totalPrice: number = 0;
    this.paths?.forEach(path => totalPrice = totalPrice + path.price)
    return totalPrice;
  }
}
