import { Controller } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller()
export class CarsController {
  constructor(private readonly carsService: CarsService) {}
}
