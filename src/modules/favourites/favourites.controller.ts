import { Controller } from '@nestjs/common';
import { FavouritesService } from './favourites.service';

@Controller()
export class FavouritesController {
  constructor(private readonly favouritesService: FavouritesService) {}
}
