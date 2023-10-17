import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CITY_LIMIT_PAGINATION } from 'src/common/constants';
import { Repository } from 'typeorm';
import { CarCity } from '../cars/entities/car-city.entity';
import { GetCitiesDto } from './dto/get-cities.dto';
import { City } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(CarCity)
    private carCitiesLanguagesRepository: Repository<CarCity>,
  ) {}

  async getCities(getCitiesDto: GetCitiesDto) {
    const offset = CITY_LIMIT_PAGINATION * (getCitiesDto.page - 1);
    const query = this.carCitiesLanguagesRepository
      .createQueryBuilder('car_cities')
      .leftJoinAndSelect('car_cities.city', 'cities');

    query
      .where('city_type = :type', { type: getCitiesDto.type })
      .groupBy('car_cities.city_id');

    if (getCitiesDto.car_id) {
      query.andWhere('car_id = :id', {
        id: getCitiesDto.car_id,
      });
    }

    const data = await query.getMany();

    return {
      items: data.slice(offset, offset + CITY_LIMIT_PAGINATION),
      ...(data.length
        ? {
            pagination: {
              total: data.length,
              offset,
              limit: CITY_LIMIT_PAGINATION,
            },
          }
        : {}),
    };
  }
}
