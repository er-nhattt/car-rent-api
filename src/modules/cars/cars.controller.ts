import { Controller, Get, Query, Param, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CarsService } from './cars.service';
import { CarDetailDto } from './dto/car-detail.dto';
import { CarsDto } from './dto/cars.dto';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { CustomCacheInterceptor } from 'src/common/interceptors/cache.interceptor';

@ApiTags('Cars')
@Controller({
  path: 'cars',
})
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @Public()
  @Serialize(CarsDto)
  @UseInterceptors(CustomCacheInterceptor)
  async getCars(
    @Query() filterDto: GetCarsFilterDto,
    @I18n() i18n: I18nContext,
    @CurrentUser() user: User,
  ) {
    const result = this.carsService.getCarByFilter(filterDto, i18n.lang, user);
    return result;
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @Public()
  @Serialize(CarDetailDto)
  @UseInterceptors(CustomCacheInterceptor)
  async getCarById(
    @Param('id') id: number,
    @I18n() i18n: I18nContext,
    @CurrentUser() user: User,
  ) {
    console.log('id:', id);
    const result = await this.carsService.getCarById(id, i18n.lang, user);
    return result;
  }
}
