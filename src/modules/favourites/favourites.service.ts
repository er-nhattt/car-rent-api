import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UpdateFavouriteStatusDto } from './dto/update-favourite-status.dto';
import { Favourite } from './entities/favourite.entity';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(Favourite)
    private favouritesRepository: Repository<Favourite>,
  ) {}

  async updateFavouriteStatus(
    updateFavouriteStatusDto: UpdateFavouriteStatusDto,
    user: User,
  ) {
    const favourite = await this.favouritesRepository.findOne({
      where: { carId: updateFavouriteStatusDto.car_id, userId: user.id },
      select: ['id', 'carId', 'userId', 'deletedAt'],
      withDeleted: true,
    });

    if (!favourite) {
      await this.createFavourite(updateFavouriteStatusDto.car_id, user);
    } else {
      if (updateFavouriteStatusDto.status) {
        if (favourite.deletedAt) {
          favourite.deletedAt = null;
          await this.favouritesRepository.save(favourite);
        }
      } else {
        if (!favourite.deletedAt) {
          await this.favouritesRepository.softDelete({
            id: favourite.id,
          });
        }
      }
    }
    return {
      message: 'Favourite success',
    };
  }

  async createFavourite(carId: number, user: User): Promise<Favourite> {
    const result = await this.favouritesRepository.save({
      userId: user.id,
      carId: carId,
    });
    return result;
  }
}
