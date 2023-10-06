import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThanOrEqual, Raw, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';
import { CityType, LIMIT_PAGINATION } from 'src/common/constants';
import { Favourite } from '../favourites/entities/favourite.entity';
import { User } from '../users/entities/user.entity';
@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,

    @InjectRepository(Favourite)
    private favouritesRepository: Repository<Favourite>,
  ) {}

  async getCarByFilter(
    getCarsFilterDto: GetCarsFilterDto,
    languageCode: string,
    user: User,
  ) {
    const offset = LIMIT_PAGINATION * (getCarsFilterDto.page - 1);
    const [data, total] = await this.carsRepository.findAndCount({
      where: {
        languages: {
          languageCode,
          carName: getCarsFilterDto.name
            ? Raw(
                (alias) =>
                  `MATCH (${alias}) AGAINST (":search*" IN BOOLEAN MODE)`,
                { search: getCarsFilterDto.name },
              )
            : undefined,
        },
        capacity: getCarsFilterDto.capacity
          ? In(getCarsFilterDto.capacity)
          : undefined,
        carTypes: {
          carType: {
            id: getCarsFilterDto.type ? In(getCarsFilterDto.type) : undefined,
            languages: { languageCode },
          },
        },
        newPrice: getCarsFilterDto.max_price
          ? LessThanOrEqual(getCarsFilterDto.max_price)
          : undefined,
        cities:
          getCarsFilterDto.pick_up_city_id || getCarsFilterDto.drop_off_city_id
            ? {
                ...(getCarsFilterDto.pick_up_city_id
                  ? {
                      cityId: getCarsFilterDto.pick_up_city_id,
                      cityType: CityType.PickUp,
                    }
                  : {}),
                ...(getCarsFilterDto.drop_off_city_id
                  ? {
                      cityId: getCarsFilterDto.drop_off_city_id,
                      cityType: CityType.DropOff,
                    }
                  : {}),
              }
            : undefined,
      },
      skip: offset,
      take: LIMIT_PAGINATION,
      relations: {
        languages: true,
        carTypes: {
          carType: {
            languages: true,
          },
        },
      },
    });

    if (user) {
      for (const car of data) {
        const favourite = await this.favouritesRepository.findOne({
          where: {
            carId: car.id,
            userId: user.id,
          },
          select: ['id', 'carId', 'userId', 'deletedAt'],
          withDeleted: true,
        });
        car['favourite_status'] =
          favourite && !favourite.deletedAt ? true : false;
      }
    }

    return {
      items: data,
      pagination: {
        total,
        offset,
        limit: LIMIT_PAGINATION,
      },
    };
  }

  async getCarById(id: number, languageCode: string, user: User) {
    const result = await this.carsRepository.findOne({
      where: {
        id,
        languages: {
          languageCode,
        },
        images: {
          objectId: id,
          objectType: 'car',
        },
        carTypes: {
          carType: {
            languages: {
              languageCode,
            },
          },
        },
      },
      relations: {
        languages: true,
        images: true,
        carTypes: {
          carType: {
            languages: true,
          },
        },
      },
    });

    if (user) {
      const favourite = await this.favouritesRepository.findOne({
        where: {
          carId: result.id,
          userId: user.id,
        },
        select: ['id', 'carId', 'userId', 'deletedAt'],
        withDeleted: true,
      });
      result['favourite_status'] =
        favourite && !favourite.deletedAt ? true : false;
    }

    return result;
  }
}
