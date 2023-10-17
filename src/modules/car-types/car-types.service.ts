import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LIMIT_PAGINATION } from 'src/common/constants';
import { Repository } from 'typeorm';
import { GetCarTypesDto } from './dto/get-car-type.dto';
import { CarTypeLanguage } from './entities/car-type-language.entity';

@Injectable()
export class CarTypesService {
  constructor(
    @InjectRepository(CarTypeLanguage)
    private carTypesLanguagesRepository: Repository<CarTypeLanguage>,
  ) {}

  async getCarTypes(getCarTypesDto: GetCarTypesDto, languageCode: string) {
    const offset = LIMIT_PAGINATION * (getCarTypesDto.page - 1);
    const [data, total] = await this.carTypesLanguagesRepository.findAndCount({
      where: {
        languageCode,
      },
      select: ['carTypeId', 'carTypeName'],
      skip: offset,
      take: LIMIT_PAGINATION,
    });
    return {
      items: data,
      pagination: {
        total,
        offset,
        limit: LIMIT_PAGINATION,
      },
    };
  }
}
