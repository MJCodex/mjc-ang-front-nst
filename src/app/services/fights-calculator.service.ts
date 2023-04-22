import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FightsCalculatorService {
  getFlights(source: string, destination: string) {
    const flights: any = [
      {
        "departureStation": "MZL",
        "arrivalStation": "MDE",
        "flightCarrier": "CO",
        "flightNumber": "8001",
        "price": 200
      },
      {
        "departureStation": "MZL",
        "arrivalStation": "CTG",
        "flightCarrier": "CO",
        "flightNumber": "8002",
        "price": 200
      },
      {
        "departureStation": "PEI",
        "arrivalStation": "BOG",
        "flightCarrier": "CO",
        "flightNumber": "8003",
        "price": 200
      },
      {
        "departureStation": "MDE",
        "arrivalStation": "BCN",
        "flightCarrier": "CO",
        "flightNumber": "8004",
        "price": 500
      },
      {
        "departureStation": "CTG",
        "arrivalStation": "CAN",
        "flightCarrier": "CO",
        "flightNumber": "8005",
        "price": 300
      },
      {
        "departureStation": "BOG",
        "arrivalStation": "MAD",
        "flightCarrier": "CO",
        "flightNumber": "8006",
        "price": 500
      },
      {
        "departureStation": "BOG",
        "arrivalStation": "MEX",
        "flightCarrier": "CO",
        "flightNumber": "8007",
        "price": 300
      },
      {
        "departureStation": "MZL",
        "arrivalStation": "PEI",
        "flightCarrier": "CO",
        "flightNumber": "8008",
        "price": 200
      },
      {
        "departureStation": "MDE",
        "arrivalStation": "CTG",
        "flightCarrier": "CO",
        "flightNumber": "8009",
        "price": 200
      },
      {
        "departureStation": "BOG",
        "arrivalStation": "CTG",
        "flightCarrier": "CO",
        "flightNumber": "8010",
        "price": 200
      },
      {
        "departureStation": "MDE",
        "arrivalStation": "MZL",
        "flightCarrier": "CO",
        "flightNumber": "9001",
        "price": 200
      },
      {
        "departureStation": "CTG",
        "arrivalStation": "MZL",
        "flightCarrier": "CO",
        "flightNumber": "9002",
        "price": 200
      },
      {
        "departureStation": "BOG",
        "arrivalStation": "PEI",
        "flightCarrier": "CO",
        "flightNumber": "9003",
        "price": 200
      },
      {
        "departureStation": "BCN",
        "arrivalStation": "MDE",
        "flightCarrier": "ES",
        "flightNumber": "9004",
        "price": 500
      },
      {
        "departureStation": "CAN",
        "arrivalStation": "CTG",
        "flightCarrier": "MX",
        "flightNumber": "9005",
        "price": 300
      },
      {
        "departureStation": "MAD",
        "arrivalStation": "BOG",
        "flightCarrier": "ES",
        "flightNumber": "9006",
        "price": 500
      },
      {
        "departureStation": "MEX",
        "arrivalStation": "BOG",
        "flightCarrier": "MX",
        "flightNumber": "9007",
        "price": 300
      },
      {
        "departureStation": "PEI",
        "arrivalStation": "MZL",
        "flightCarrier": "CO",
        "flightNumber": "9008",
        "price": 200
      },
      {
        "departureStation": "CTG",
        "arrivalStation": "MDE",
        "flightCarrier": "CO",
        "flightNumber": "9009",
        "price": 200
      },
      {
        "departureStation": "CTG",
        "arrivalStation": "BOG",
        "flightCarrier": "CO",
        "flightNumber": "9010",
        "price": 200
      }
    ];

    const flightsGraph: { [key: string]: any } = this.createFlightsGraph(flights);
    return this.calculateFlightPaths(flightsGraph, source, destination);
  }

  createFlightsGraph(flights: any[]): { [key: string]: any } {
    const flightsGraph: { [key: string]: any } = {};
    flights.forEach((flight: any): void => {
      flightsGraph[flight.departureStation] = flightsGraph[flight.departureStation] ?? [];
      flightsGraph[flight.departureStation].push(flight);
    });
    return flightsGraph;
  }


  calculateFlightPaths(flightsGraph: { [key: string]: any }, source: string, destination: string) {
    const childPaths: any[] = flightsGraph[source];
    const allPaths: any[] = Array.from({length: childPaths.length}, () => []);
    childPaths.forEach((childPath, index) => {
      allPaths[index].push(childPath);
      this.calculatePath(flightsGraph[childPath.arrivalStation], destination, index, allPaths, flightsGraph);
    });
    return this.removeUnsuccessfulPaths(allPaths, destination);
  }

  calculatePath(flights: any[], destination: string, index: number, allPaths: any[][], graph: { [key: string]: any }) {
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

  visitedFlight(flights: any[], currentFlight: string) {
    const includedFlight = flights.find(flight => flight.arrivalStation === currentFlight);
    return !!includedFlight;
  }

  removeUnsuccessfulPaths(allPaths: any[], destination: string) {
    return allPaths.filter(path => path[path.length - 1].arrivalStation === destination);
  }
}
