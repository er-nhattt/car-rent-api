import { Body, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { CitiesService } from './cities.service';
import { CitiesDto } from './dto/cities.dto';
import { GetCitiesDto } from './dto/get-cities.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CustomCacheInterceptor } from 'src/common/interceptors/cache.interceptor';

@ApiTags('Cities')
@Controller({
  path: 'cities',
})
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('')
  @Serialize(CitiesDto)
  @UseInterceptors(CustomCacheInterceptor)
  async getCities(@Query() getCitiesDto: GetCitiesDto) {
    const result = await this.citiesService.getCities(getCitiesDto);
    return result;
  }
}
