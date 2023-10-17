import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Favourite } from './entities/favourite.entity';
import { FavouritesController } from './favourites.controller';
import { FavouritesService } from './favourites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favourite, User])],
  controllers: [FavouritesController],
  providers: [FavouritesService],
})
export class FavouritesModule {}
