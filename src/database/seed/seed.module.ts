import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarTypeLanguage } from 'src/modules/car-types/entities/car-type-language.entity';
import { CarType } from 'src/modules/car-types/entities/car-type.entity';
import { CarCarType } from 'src/modules/cars/entities/car-car-type.entity';
import { CarCity } from 'src/modules/cars/entities/car-city.entity';
import { CarLanguage } from 'src/modules/cars/entities/car-language.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { City } from 'src/modules/cites/entities/city.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { Language } from 'src/modules/languages/entities/language.entity';
import { PaymentMethod } from 'src/modules/payment-methods/entities/payment-method.entity';
import { Promo } from 'src/modules/promos/entities/promo.entity';
import { SeedService } from './seed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
      Image,
      Language,
      CarLanguage,
      CarTypeLanguage,
      CarCarType,
      CarType,
      City,
      CarCity,
      PaymentMethod,
      Promo,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
