import { FightsCalculatorService } from './fights-calculator.service';
import { FlightsService } from "./flights.service";

describe('FightsCalculatorService', () => {
  let service: FightsCalculatorService;
  let fake_flightsService: jasmine.SpyObj<FlightsService>;

  function createService() {
    service = new FightsCalculatorService(
      fake_flightsService,
    );
  }

  beforeEach(() => {
    fake_flightsService = jasmine.createSpyObj<FlightsService>('FlightsService', ['getFlights']);

    createService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

});
