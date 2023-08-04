import { Observable, Observer } from 'rxjs';
import { City } from 'src/app/types/types';

export const allCitiesMock: City[] = [
  {
    uuid: '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f',
    cityName: 'Berlin',
    count: 523,
  },
  {
    uuid: '4a7f5c2d-3a10-4a02-a9b3-450839929e43',
    cityName: 'Hamburg',
    count: 267,
  },
  {
    uuid: '09a20ce8-eb77-40f9-99c8-aa4e7dbf6a99',
    cityName: 'München',
    count: 899,
  },
  {
    uuid: '0a40416f-aa4c-4b8b-8ce3-e82e664a4cd1',
    cityName: 'Köln',
    count: 471,
  },
  {
    uuid: 'e1ad9f95-44b5-4d80-8b26-df42a53fcfb6',
    cityName: 'Frankfurt',
    count: 110,
  },
  {
    uuid: '66b8009b-319d-4272-92ea-853a10c27c9a',
    cityName: 'Stuttgart',
    count: 782,
  },
];

export const berlinMock: City = {
  uuid: '7e8a29e2-62d1-4ec1-ae15-8ff2f777318f',
  cityName: 'Berlin',
  count: 523,
};

export class MockApiCallService {
  getCities() {
    return new Observable((observer: Observer<City[]>) => {
      observer.next(allCitiesMock);
    });
  }
  getCitiesBy(url: string) {
    if (
      url === `byName/${berlinMock.cityName}` ||
      `byUuid/${berlinMock.uuid}` ||
      `byCount/${berlinMock.count}`
    ) {
      return new Observable((observer: Observer<City[]>) => {
        observer.next([berlinMock]);
      });
    } else throw new ErrorEvent('City not Found');
  }
}
