import {Injectable} from '@angular/core';
import {FlightsService} from "./flights.service";
import {FlightApiResponseModel} from "../models/flight-api-response.model";

@Injectable({
  providedIn: 'root'
})
export class FightsCalculatorService {
  private flights: FlightApiResponseModel[] | undefined = [];

  constructor(
    private _flightsService: FlightsService
  ) {
  }

  async getFlights(source: string, destination: string): Promise<any[]> {
    await this.getFlightsApi();
    const flightsGraph: { [key: string]: any } = this.createFlightsGraph(this.flights);
    return this.calculateFlightPaths(flightsGraph, source, destination);
  }

  private createFlightsGraph(flights: FlightApiResponseModel[] | undefined): { [p: string]: any } {
    const flightsGraph: { [key: string]: any } = {};
    flights?.forEach((flight: any): void => {
      flightsGraph[flight.departureStation] = flightsGraph[flight.departureStation] ?? [];
      flightsGraph[flight.departureStation].push(flight);
    });
    return flightsGraph;
  }


  private calculateFlightPaths(flightsGraph: { [key: string]: any }, source: string, destination: string) {
    const childPaths: any[] = flightsGraph[source];
    const allPaths: any[] = Array.from({length: childPaths.length}, () => []);
    childPaths.forEach((childPath, index: number): void => {
      allPaths[index].push(childPath);
      this.calculatePath(flightsGraph[childPath.arrivalStation], destination, index, allPaths, flightsGraph);
    });
    return this.removeUnsuccessfulPaths(allPaths, destination);
  }

  private calculatePath(flights: any[], destination: string, index: number, allPaths: any[][], graph: {
    [key: string]: any
  }) {
    for (const flight of flights) {
      if (flight.arrivalStation === destination) {
        allPaths[index].push(flight);
        break;
      }
      if (this.visitedFlight(allPaths[index], flight.departureStation)) {
        continue;
      }
      allPaths[index].push(flight);
      this.calculatePath(graph[flight.arrivalStation], destination, index, allPaths, graph)
    }
  }

  private visitedFlight(flights: any[], currentFlight: string) {
    const includedFlight = flights.find(flight => flight.arrivalStation === currentFlight);
    return !!includedFlight;
  }

  private removeUnsuccessfulPaths(allPaths: any[], destination: string) {
    return allPaths.filter(path => path[path.length - 1].arrivalStation === destination);
  }

  async getAllDestinations(): Promise<string[]> {
    await this.getFlightsApi();
    const flightsGraph: { [key: string]: any } = this.createFlightsGraph(this.flights);
    return Object.keys(flightsGraph);
  }

  async getFlightsApi(): Promise<void> {
    if (!this.flights?.length) {
      this.flights = await this._flightsService.getFlights().toPromise();
    }
  }
}
