import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { CitiesService } from './cities.service';

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
}
