import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import {
  PromoType,
  OrderStatus,
  OrderError,
  CarError,
  CityType,
  ORDER_LIMIT_PAGINATION,
  SystemError,
} from 'src/common/constants';
import { ApplicationError, ChildError } from 'src/common/error/app.error';
import {
  Between,
  EntityManager,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CarCity } from '../cars/entities/car-city.entity';
import { Car } from '../cars/entities/car.entity';
import { PaymentMethod } from '../payment-methods/entities/payment-method.entity';
import { Promo } from '../promos/entities/promo.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailsRepository: Repository<OrderDetail>,
  ) {}

  async validateOrder(createOrderDto: CreateOrderDto, manager: EntityManager) {
    const childErrors: ChildError[] = [];
    let validDatetime = true;
    if (!createOrderDto.order_name) {
      childErrors.push({
        key: OrderError.CAN_NOT_ORDER,
        field: 'order_name',
      });
    }

    if (!createOrderDto.order_phone_number) {
      childErrors.push({
        key: OrderError.CAN_NOT_ORDER,
        field: 'order_phone_number',
      });
    }

    const car = await manager.findOne(Car, {
      where: { id: createOrderDto.car_ids[0] },
      lock: { mode: 'pessimistic_write' },
    });
    if (!car) {
      childErrors.push({
        key: CarError.CAR_NOT_FOUND,
        field: 'car',
      });
    }

    const pickUpCity = await manager.findOne(CarCity, {
      where: {
        carId: createOrderDto.car_ids[0],
        cityId: createOrderDto.pick_up_city_id,
        cityType: CityType.PickUp,
      },
    });

    if (!pickUpCity) {
      childErrors.push({
        key: OrderError.INVALID_PICK_UP_CITY,
        field: 'pick_up_city',
      });
    }

    const dropOffCity = await manager.findOne(CarCity, {
      where: {
        carId: createOrderDto.car_ids[0],
        cityId: createOrderDto.drop_off_city_id,
        cityType: CityType.DropOff,
      },
    });

    if (!dropOffCity) {
      childErrors.push({
        key: OrderError.INVALID_DROP_OFF_CITY,
        field: 'drop_off_city',
      });
    }

    if (createOrderDto.pick_up_at >= createOrderDto.drop_off_at) {
      validDatetime = false;
      childErrors.push({
        key: OrderError.INVALID_RENTAL_TIME,
        field: 'drop_off_at',
      });
    } else {
      if (moment().diff(createOrderDto.pick_up_at, 'hours') > -23) {
        validDatetime = false;
        childErrors.push({
          key: OrderError.RENTAL_TIME_IN_PAST,
          field: 'pick_up_at',
        });
      }

      if (moment().diff(createOrderDto.drop_off_at, 'hours') > -23) {
        validDatetime = false;
        childErrors.push({
          key: OrderError.RENTAL_TIME_IN_PAST,
          field: 'drop_off_at',
        });
      }
    }

    if (validDatetime) {
      const orderConflict = await this.checkCarHasBeenRentAtTime(
        car.id,
        createOrderDto.pick_up_at,
        createOrderDto.drop_off_at,
        manager,
      );

      if (orderConflict) {
        childErrors.push(
          {
            key: OrderError.CONFLICT_RENTAL_TIME,
            field: 'pick_up_at',
          },
          {
            key: OrderError.CONFLICT_RENTAL_TIME,
            field: 'drop_off_at',
          },
        );
      }
    }

    const paymentMethod = await manager.findOne(PaymentMethod, {
      where: {
        code: createOrderDto.payment_method_code,
      },
    });

    if (!paymentMethod) {
      childErrors.push({
        key: OrderError.CAN_NOT_ORDER,
        field: 'payment_method',
      });
    }

    return childErrors;
  }

  async checkCarHasBeenRentAtTime(
    carId: number,
    pickUpAt: Date,
    dropOffAt: Date,
    manager: EntityManager,
  ) {
    const pickUpAtAfterADay = new Date(
      moment(pickUpAt).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    );
    const dropOffAtAfterADay = new Date(
      moment(dropOffAt).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
    );
    const order = await manager.findOne(OrderDetail, {
      where: [
        {
          carId,
          pickUpAt: Between(pickUpAtAfterADay, dropOffAtAfterADay),
        },
        {
          carId,
          dropOffAt: Between(pickUpAtAfterADay, dropOffAtAfterADay),
        },
        {
          carId,
          pickUpAt: LessThanOrEqual(pickUpAtAfterADay),
          dropOffAt: MoreThanOrEqual(dropOffAtAfterADay),
        },
      ],
    });

    return order;
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
    car: Car,
    promo: Promo | null,
    manager: EntityManager,
  ): Promise<Order> {
    const order = await manager.save(Order, {
      userId: user.id,
      orderName: createOrderDto.order_name,
      orderAddress: createOrderDto.order_address,
      orderPhoneNumber: createOrderDto.order_phone_number,
      orderCity: createOrderDto.order_city,
      promoCode: promo?.code,
      promoType: promo?.type,
      discount: promo?.discount,
      totalPrice: await this.calcTotalPrice(
        car,
        createOrderDto.pick_up_at,
        createOrderDto.drop_off_at,
        promo,
      ),
      paymentMethodCode: createOrderDto.payment_method_code,
      status: OrderStatus.InProgress,
      details: [
        await manager.save(OrderDetail, {
          carId: car.id,
          pickUpCityId: createOrderDto.pick_up_city_id,
          dropOffCityId: createOrderDto.drop_off_city_id,
          pickUpAt: createOrderDto.pick_up_at,
          dropOffAt: createOrderDto.drop_off_at,
          price: car.newPrice,
        }),
      ],
    });
    return order;
  }

  async calcTotalPrice(
    car: Car,
    pickUpAt: Date,
    dropOffAt: Date,
    promo: Promo | null,
  ) {
    const pickUpDate = new Date(new Date(pickUpAt).toJSON().slice(0, 10));
    const dropOffDate = new Date(new Date(dropOffAt).toJSON().slice(0, 10));
    const diffDays = Math.ceil(
      (dropOffDate.getTime() - pickUpDate.getTime()) / (1000 * 3600 * 24) + 1,
    );

    let totalPrice = car.newPrice * diffDays;

    if (promo) {
      if (promo.type === PromoType.Percentage) {
        totalPrice = totalPrice * ((100 - promo.discount) / 100);
      }
      if (promo.type === PromoType.Absolute) {
        totalPrice = totalPrice - promo.discount;
      }
    }

    return totalPrice;
  }

  async getOrdersByUser(
    getOrdersDto: GetOrdersDto,
    languageCode: string,
    user: User,
  ) {
    const offset = ORDER_LIMIT_PAGINATION * (getOrdersDto.page - 1);
    const [data, total] = await this.ordersRepository.findAndCount({
      where: {
        userId: user.id,
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
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: ORDER_LIMIT_PAGINATION,
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

    return {
      items: data,
      pagination: {
        total,
        offset,
        limit: ORDER_LIMIT_PAGINATION,
      },
    };
  }

  async getOrderById(orderId: number, languageCode: string, user: User) {
    const order = await this.ordersRepository.findOne({
      where: {
        userId: user.id,
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

    if (!order) {
      throw new ApplicationError(SystemError.OBJECT_NOT_FOUND);
    }

    return order;
  }
}
