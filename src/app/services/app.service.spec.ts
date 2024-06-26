import { TestBed } from '@angular/core/testing';

import { AppService } from './app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AppService', () => {
  let service: AppService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService]
    });
    service = TestBed.inject(AppService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('checkMongoConnection should make a POST request with the correct URL and payload', async () => {
      const mongoConnectionString = 'mongodb://localhost:27017/test';
      const mockResponse = { data: 'some response' };

      service.checkMongoConnection(mongoConnectionString).then((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(`${service['apiBaseUrl']}/${service['CHECK_MONGO_CONNECTION']}`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual({ mongoConnectionString });
      req.flush(mockResponse);
    });

    it('checkSqlConnection should make a POST request with the correct URL and payload', async () => {
      const sqlConfig = {
        sqlServer: 'localhost',
        sqlServerUsername: 'test',
        sqlServerPassword: 'test',
        sqlServerDatabaseName: 'test'
      };
      const mockResponse = { data: 'some response' };

      service.checkSqlConnection(sqlConfig).then((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne(`${service['apiBaseUrl']}/${service['CHECK_SQL_CONNECTION']}`);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(sqlConfig);
      req.flush(mockResponse);
    });
});
