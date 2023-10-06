import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../auth/entities/token.entity';
import { Favourite } from '../favourites/entities/favourite.entity';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { Car } from './entities/car.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car, Favourite])],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
