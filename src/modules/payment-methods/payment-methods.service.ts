import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LIMIT_PAGINATION, OrderStatus } from 'src/common/constants';
import { EntityManager, Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
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

  async paymentByCod(
    orderId: number,
    manager: EntityManager,
    languageCode: string,
  ) {
    await manager.update(
      Order,
      { id: orderId },
      {
        status: OrderStatus.UnPaid,
      },
    );
    const order = await manager.findOne(Order, {
      where: {
        id: orderId,
        details: {
          car: {
            languages: {
              languageCode,
            },
            carTypes: {
              carType: {
                languages: {
                  languageCode,
                },
              },
            },
          },
        },
      },
      relations: {
        details: {
          car: {
            languages: true,
            carTypes: {
              carType: {
                languages: true,
              },
            },
          },
          pickUpCity: true,
          dropOffCity: true,
        },
      },
    });

    return order;
  }
}
