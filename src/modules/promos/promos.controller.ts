import { Controller } from '@nestjs/common';
import { PromosService } from './promos.service';

@Controller()
export class PromosController {
  constructor(private readonly promosService: PromosService) {}
}
