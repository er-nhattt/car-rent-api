import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { CarsService } from './cars.service';
import { CarsDto } from './dto/cars.dto';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';

@ApiTags('Cars')
@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('/cars')
  @Serialize(CarsDto)
  async getCars(@Query() filterDto: GetCarsFilterDto, @I18n() i18n: I18nContext) {
    const value =  await this.carsService.getCarByFilter(filterDto, i18n.lang);

    // console.log(value);
    return value;
  }
}
