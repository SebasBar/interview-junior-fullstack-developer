import { Injectable } from '@nestjs/common';
import * as Cities from '../assests/cities.json';
import { CityDto } from './dto/city.dto';
import { InjectModel } from '@nestjs/mongoose';
import { City } from './schemas/city.schema';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CitiesService {
  constructor(@InjectModel('City') private cityModel: Model<City>) {}

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

  //MongoDBServices
  async createCityMongo(createCityDto: CreateCityDto): Promise<City> {
    const cityCreated = await this.cityModel.findOne({
      cityName: createCityDto.cityName,
    });
    if (!!cityCreated?.cityName) {
      return cityCreated;
    } else {
      const newCity = new this.cityModel(createCityDto);
      return newCity.save();
    }
  }

  async createCityArrayMongo(
    createCityArrayDto: CreateCityDto[],
  ): Promise<City[]> {
    let arrayResponse = [];

    for await (const city of createCityArrayDto) {
      const cityCreated = await this.cityModel.findOne({
        cityName: city.cityName,
      });

      if (!!cityCreated?.cityName) {
        arrayResponse.push(cityCreated);
      } else {
        const newCity = new this.cityModel(city);
        arrayResponse.push(newCity.save());
      }
    }

    return arrayResponse;
  }
  async getAllMongoCities(): Promise<City[]> {
    return this.cityModel.find().exec();
  }
  async getMongoDbCitiesByName(cityName: string): Promise<City[]> {
    const filteredCities = await this.cityModel.find({ cityName });
    if (filteredCities.length === 0) {
      throw new Error('City name not found');
    }
    return filteredCities;
  }

  async getMongoDbCitiesByUUID(uuid: string) {
    const filteredCities = await this.cityModel.find({ uuid });
    if (filteredCities.length === 0) {
      throw new Error('City uuid not found');
    }
    return filteredCities;
  }

  async getMongoDbCitiesByCount(count: string) {
    const filteredCities = await this.cityModel.find({ count });
    if (filteredCities.length === 0) {
      throw new Error('City name not found');
    }
    return filteredCities;
  }
}
