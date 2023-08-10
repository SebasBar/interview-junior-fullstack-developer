import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './schemas/city.schema';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  getCities() {
    return this.citiesService.getCities();
  }

  @Get('/byName/:name')
  getCitiesByName(@Param('name') name: string) {
    try {
      return this.citiesService.getCitiesByName(name);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Get('/byUuid/:uuid')
  getCitiesByUUID(@Param('uuid') uuid: string) {
    try {
      return this.citiesService.getCitiesByUUID(uuid);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Get('/byCount/:count')
  getCitiesByCount(@Param('count') count: string) {
    try {
      return this.citiesService.getCitiesByCount(count);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  // MongoDB connection
  @Get('/mongoDb')
  async getAllMongoCities(): Promise<City[]> {
    return this.citiesService.getAllMongoCities();
  }

  @Post('/mongoDb')
  async createCityMongo(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.createCityMongo(createCityDto);
  }
  @Post('/mongoDb/byCityArray')
  async createCityArrayMongo(@Body() createCityDtoArray: CreateCityDto[]) {
    return this.citiesService.createCityArrayMongo(createCityDtoArray);
  }

  @Get('/mongoDb/byName/:name')
  getMongoDbCitiesByName(@Param('name') name: string) {
    try {
      return this.citiesService.getMongoDbCitiesByName(name);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Get('/mongoDb/byUuid/:uuid')
  getMongoDbCitiesByUUID(@Param('uuid') uuid: string) {
    try {
      return this.citiesService.getMongoDbCitiesByUUID(uuid);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  @Get('/mongoDb/byCount/:count')
  getMongoDbCitiesByCount(@Param('count') count: string) {
    try {
      return this.citiesService.getMongoDbCitiesByCount(count);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
