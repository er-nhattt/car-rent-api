import { Body, Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { CarTypesService } from './car-types.service';
import { CarTypesDto } from './dto/car-types.dto';
import { GetCarTypesDto } from './dto/get-car-type.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Car types')
@Controller({
  path: 'car-types',
})
export class CarTypesController {
  constructor(private readonly carTypesService: CarTypesService) {}

  @Get('')
  @Serialize(CarTypesDto)
  @UseInterceptors(CacheInterceptor)
  async getCarTypes(
    @Query() getCarTypesDto: GetCarTypesDto,
    @I18n() i18n: I18nContext,
  ) {
    const result = await this.carTypesService.getCarTypes(
      getCarTypesDto,
      i18n.lang,
    );
    return result;
  }
}
