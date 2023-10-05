import { Controller, Get, Query, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { CarsService } from './cars.service';
import { CarDetailDto } from './dto/car-detail.dto';
import { CarsDto } from './dto/cars.dto';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';

@ApiTags('Cars')
@Controller({
  path: 'cars',
})
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('')
  @Serialize(CarsDto)
  async getCars(
    @Query() filterDto: GetCarsFilterDto,
    @I18n() i18n: I18nContext,
  ) {
    const result = this.carsService.getCarByFilter(filterDto, i18n.lang);
    return result;
  }

  @Get('/:id')
  @Serialize(CarDetailDto)
  async getCarById(@Param('id') id: number, @I18n() i18n: I18nContext) {
    const result = await this.carsService.getCarById(id, i18n.lang);
    return result;
  }
}
