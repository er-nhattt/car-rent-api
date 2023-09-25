import { Module } from '@nestjs/common';
import { CitiesController } from './cites.controller';
import { CitiesService } from './cities.service';

@Module({
  imports: [],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
