import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LIMIT_PAGINATION } from 'src/common/constants';
import { Repository } from 'typeorm';
import { GetCarTypesDto } from './dto/get-car-type.dto';
import { CarTypeLanguage } from './entities/car-type-language.entity';
import { CarType } from './entities/car-type.entity';

@Injectable()
export class CarTypesService {
  constructor(
    @InjectRepository(CarTypeLanguage)
    private carTypeLanguagesRepository: Repository<CarTypeLanguage>,
  ) {}

  async getCarTypes(getCarTypesDto: GetCarTypesDto, languageCode: string) {
    const [data, total] = await this.carTypeLanguagesRepository.findAndCount({
      where: {
        languageCode,
      },
      select: ['carTypeId', 'carTypeName'],
      skip: LIMIT_PAGINATION * (getCarTypesDto.page - 1),
      take: LIMIT_PAGINATION,
    });
    return {
      items: data,
      pagination: {
        total,
        offset: LIMIT_PAGINATION * (getCarTypesDto.page - 1),
        limit: LIMIT_PAGINATION,
      },
    };
  }
}
