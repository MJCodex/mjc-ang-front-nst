import { CurrencyService } from './currency.service';
import { HttpClient } from "@angular/common/http";

describe('CurrencyService', () => {
  let service: CurrencyService;
  let fake_http: jasmine.SpyObj<HttpClient>;

  function createService() {
    service = new CurrencyService(
      fake_http,
    );
  }

  beforeEach(() => {
    fake_http = jasmine.createSpyObj<HttpClient>('HttpClient', ['get']);

    createService();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

});
