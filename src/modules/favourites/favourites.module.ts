import { Module } from '@nestjs/common';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';


@Module({
  imports: [],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
