import { FlightsService } from './flights.service';
import { HttpClient } from "@angular/common/http";

describe('FlightsService', () => {
  let service: FlightsService;
  let fake_httpClient: jasmine.SpyObj<HttpClient>;

  function createService() {
    service = new FlightsService(
      fake_httpClient,
    );
  }

  beforeEach(() => {
    fake_httpClient = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    createService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

});
