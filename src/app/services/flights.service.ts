import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  getFlights() {
    return this._httpClient.get(`${environment.api}flights/2`);
  }
}
