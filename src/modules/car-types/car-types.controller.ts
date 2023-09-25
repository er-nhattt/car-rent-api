import { Controller } from '@nestjs/common';
import { CarTypesService } from './car-types.service';

@Controller()
export class CarTypesController {
  constructor(private readonly carTypesService: CarTypesService) {}
}
