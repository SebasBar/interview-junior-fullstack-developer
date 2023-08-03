import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiCallService } from './api-call.service';
import { allCitiesMock, berlinMock } from '../mocks/cities-mock';

describe('ApiCallService', () => {
  let apiCallService: ApiCallService;
  let httpMockController: HttpTestingController;
  let baseUrl = 'http://localhost:3000/cities/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    apiCallService = TestBed.inject(ApiCallService);
    httpMockController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMockController.verify();
  });

  it('create service', () => {
    expect(apiCallService).toBeTruthy();
  });

  describe('getCities', () => {
    it('returns array of all cities', () => {
      apiCallService.getCities().subscribe((cities) => {
        expect(cities).toEqual(allCitiesMock);
      });

      const req = httpMockController.expectOne({
        method: 'GET',
        url: baseUrl,
      });
      req.flush(allCitiesMock);
    });
  });

  describe('getCitiesBy name', () => {
    it('returns one city for "berlin" as parameter', () => {
      apiCallService.getCitiesBy('byName/berlin').subscribe((cities) => {
        expect(cities).toEqual([berlinMock]);
      });

      const req = httpMockController.expectOne({
        method: 'GET',
        url: `${baseUrl}byName/berlin`,
      });
      req.flush([berlinMock]);
    });
  });

  describe('getCitiesBy uuid', () => {
    it('returns one city for berlin uuid as parameter', () => {
      apiCallService
        .getCitiesBy('byUuid/7e8a29e2-62d1-4ec1-ae15-8ff2f777318f')
        .subscribe((cities) => {
          expect(cities).toEqual([berlinMock]);
        });

      const req = httpMockController.expectOne({
        method: 'GET',
        url: `${baseUrl}byUuid/7e8a29e2-62d1-4ec1-ae15-8ff2f777318f`,
      });
      req.flush([berlinMock]);
    });
  });

  describe('getCitiesBy count', () => {
    it('returns one city for berlin count as parameter', async () => {
      apiCallService.getCitiesBy('byCouny/523').subscribe((cities) => {
        expect(cities).toEqual([berlinMock]);
      });

      const req = httpMockController.expectOne({
        method: 'GET',
        url: `${baseUrl}byCouny/523`,
      });
      req.flush([berlinMock]);
    });
  });
});
