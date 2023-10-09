import { Body, Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { CitiesService } from './cities.service';
import { CitiesDto } from './dto/cities.dto';
import { GetCitiesDto } from './dto/get-cities.dto';

@ApiTags('Cities')
@Controller({
  path: 'cities',
})
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get('')
  @Serialize(CitiesDto)
  async getCities(@Query() getCitiesDto: GetCitiesDto) {
    const result = await this.citiesService.getCities(getCitiesDto);
    return result;
  }
}
