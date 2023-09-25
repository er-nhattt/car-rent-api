import { Module } from '@nestjs/common';
import { CarTypesController } from './car-types.controller';
import { CarTypesService } from './car-types.service';

@Module({
  imports: [],
  controllers: [CarTypesController],
  providers: [CarTypesService],
})
export class CarTypesModule {}
