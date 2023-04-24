import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {FlightApiResponseModel} from "../models/flight-api-response.model";

@Injectable({
  providedIn: 'root'
})
export class FlightsService {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  getFlights(): Observable<FlightApiResponseModel[]> {
    return this._httpClient.get<FlightApiResponseModel[]>(`${environment.api}flights/2`);
  }
}
