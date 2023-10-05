import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThanOrEqual, Raw, Repository } from 'typeorm';
import { Car } from './entities/car.entity';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';
import {
  CityType,
  LIMIT_PAGINATION,
  OFFSET_PAGINATION,
} from 'src/common/constants';
@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  async getCarByFilter(
    getCarsFilterDto: GetCarsFilterDto,
    languageCode: string,
  ) {
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
      skip: getCarsFilterDto.offset || OFFSET_PAGINATION,
      take: getCarsFilterDto.limit || LIMIT_PAGINATION,
      relations: {
        languages: true,
        carTypes: {
          carType: {
            languages: true,
          },
        },
      },
    });

    return {
      items: data,
      pagination: {
        total,
        offset: getCarsFilterDto.offset || OFFSET_PAGINATION,
        limit: getCarsFilterDto.limit || LIMIT_PAGINATION,
      },
    };
  }

  async getCarById(id: number, languageCode: string) {
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

    return result;
  }
}
