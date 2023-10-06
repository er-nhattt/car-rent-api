import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LIMIT_PAGINATION } from 'src/common/constants';
import { Repository } from 'typeorm';
import { GetPaymentMethodDto } from './dto/get-payment-methods.dto';
import { PaymentMethod } from './entities/payment-method.entity';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodsRepository: Repository<PaymentMethod>,
  ) {}

  async getPaymentMethods(getPaymentMethodsDto: GetPaymentMethodDto) {
    const offset = LIMIT_PAGINATION * (getPaymentMethodsDto.page - 1);
    const [data, total] = await this.paymentMethodsRepository.findAndCount({
      select: ['id', 'code', 'name'],
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
