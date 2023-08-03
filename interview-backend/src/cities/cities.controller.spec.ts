import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import * as CitiesJson from '../assests/cities.json';

describe('CitiesController', () => {
  let citiesService: CitiesService;
  let citiesController: CitiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService],
    }).compile();

    citiesService = module.get<CitiesService>(CitiesService);
    citiesController = module.get<CitiesController>(CitiesController);
  });

  it('be defined', () => {
    expect(citiesController).toBeDefined();
  });

  describe('getCities', () => {
    it('returns all cities', async () => {
      const cities = await citiesController.getCities();
      expect(cities).toEqual(CitiesJson);
    });
  });

  describe('getCitiesByName', () => {
    it('returns cityName="Berlin" with "berlin" as parameter', async () => {
      const response = await citiesController.getCitiesByName('berlin');
      expect(response[0].cityName).toBe('Berlin');
    });
  });

  describe('getCitiesByUuid', () => {
    it('returns cityName="Stuttgard" with its uuid as parameter', async () => {
      const response = await citiesController.getCitiesByUUID(
        '66b8009b-319d-4272-92ea-853a10c27c9a',
      );
      expect(response[0].cityName).toBe('Stuttgart');
    });
  });

  describe('getCitiesByCount', () => {
    it('returns cityName="Essen" with 990 as parameter', async () => {
      const response = await citiesController.getCitiesByCount('990');
      expect(response[0].cityName).toBe('Essen');
    });
  });
});
