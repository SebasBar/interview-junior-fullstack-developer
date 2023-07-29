import { Injectable } from '@nestjs/common';
import * as Cities from '../assests/cities.json';
import { CityDto } from './dto/city.dto';

@Injectable()
export class CitiesService {
  private cities: CityDto[] = Cities;

  getCities() {
    return this.cities;
  }

  getCitiesByName(name: string) {
    const filteredCities = this.cities.filter((city) => {
      return city.cityName.includes(name);
    });
    if (!filteredCities || filteredCities.length === 0) {
      const cityOrCities = filteredCities.length > 1 ? 'Cities' : 'City';
      throw new Error(`${cityOrCities} not found`);
    }
    return filteredCities;
  }

  getCitiesByUUID(uuid: string) {
    const filteredCities = this.cities.filter((city) => {
      return city.uuid.includes(uuid);
    });
    if (!filteredCities || filteredCities.length === 0) {
      const cityOrCities = filteredCities.length > 1 ? 'Cities' : 'City';
      throw new Error(`${cityOrCities} not found`);
    }
    return filteredCities;
  }

  getCitiesByCount(count: string) {
    const filteredCities = this.cities.filter((city) => {
      return String(city.count).includes(count);
    });
    if (!filteredCities || filteredCities.length === 0) {
      const cityOrCities = filteredCities.length > 1 ? 'Cities' : 'City';
      throw new Error(`${cityOrCities} not found`);
    }

    return filteredCities;
  }
}
