import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import * as CitiesJson from '../assests/cities.json';

describe('CitiesService', () => {
  let citiesService: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CitiesService],
    }).compile();

    citiesService = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(citiesService).toBeDefined();
  });

  describe('getCities', () => {
    it('should return all cities', async () => {
      const cities = await citiesService.getCities();
      expect(cities).toBe(CitiesJson);
    });
  });

  describe('getCitiesByName', () => {
    it('should return cityName="Berlin" with "berlin" as name parameter', async () => {
      const response = await citiesService.getCitiesByName('berlin');
      expect(response[0].cityName).toBe('Berlin');
    });
  });

  describe('getCitiesByUuid', () => {
    it('should return cityName="Stuttgard" with its uuid as uuid parameter', async () => {
      const response = await citiesService.getCitiesByUUID(
        '66b8009b-319d-4272-92ea-853a10c27c9a',
      );
      expect(response[0].cityName).toBe('Stuttgart');
    });
  });

  describe('getCitiesByCount', () => {
    it('should return cityName="Essen" with 990 as count parameter', async () => {
      const response = await citiesService.getCitiesByCount('990');
      expect(response[0].cityName).toBe('Essen');
    });
  });
});
