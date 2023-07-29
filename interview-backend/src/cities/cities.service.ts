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
      return city.cityName.toLowerCase().includes(name.toLowerCase());
    });
    if (!filteredCities || filteredCities.length === 0) {
      throw new Error('City name not found');
    }
    return filteredCities;
  }

  getCitiesByUUID(uuid: string) {
    const filteredCities = this.cities.filter((city) => {
      return city.uuid.includes(uuid);
    });
    if (!filteredCities || filteredCities.length === 0) {
      throw new Error('City UUID not found');
    }
    return filteredCities;
  }

  getCitiesByCount(count: string) {
    const filteredCities = this.cities.filter((city) => {
      return String(city.count).includes(count);
    });
    if (!filteredCities || filteredCities.length === 0) {
      throw new Error('City count not found');
    }

    return filteredCities;
  }
}
