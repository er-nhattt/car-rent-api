import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromoError } from 'src/common/constants';
import { ApplicationError } from 'src/common/error/app.error';
import { Repository } from 'typeorm';
import { Promo } from './entities/promo.entity';

@Injectable()
export class PromosService {
  constructor(
    @InjectRepository(Promo)
    private promosRepository: Repository<Promo>,
  ) {}

  async getPromoByCode(code: string) {
    const promo = await this.promosRepository.findOne({
      where: {
        code,
      },
    });

    if (!promo) {
      throw new ApplicationError(PromoError.PROMO_NOT_FOUND);
    }

    if (promo.quantity < 1) {
      throw new ApplicationError(PromoError.PROMO_QUANTITY_NOT_ENOUGH);
    }

    return promo;
  }
}
