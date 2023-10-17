import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarTypesController } from './car-types.controller';
import { CarTypesService } from './car-types.service';
import { CarTypeLanguage } from './entities/car-type-language.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarTypeLanguage])],
  controllers: [CarTypesController],
  providers: [CarTypesService],
})
export class CarTypesModule {}
