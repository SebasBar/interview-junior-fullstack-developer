import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    return this.citiesService.getCitiesByName(name);
  }

  @Get('/byUuid/:uuid')
  getCitiesByUUID(@Param('uuid') uuid: string) {
    return this.citiesService.getCitiesByUUID(uuid);
  }

  @Get('/byCount/:count')
  getCitiesByCount(@Param('count') count: string) {
    return this.citiesService.getCitiesByCount(count);
  }
}
