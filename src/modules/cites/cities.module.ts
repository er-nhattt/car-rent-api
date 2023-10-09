import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarCity } from '../cars/entities/car-city.entity';
import { CitiesController } from './cites.controller';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City, CarCity])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
