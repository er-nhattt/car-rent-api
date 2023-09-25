import { Controller } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller()
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}
}
