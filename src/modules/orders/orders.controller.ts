import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { OrderError, PaymentMethodCode } from 'src/common/constants';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApplicationError, ChildError } from 'src/common/error/app.error';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { DataSource } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Car } from '../cars/entities/car.entity';
import { PaymentMethodsService } from '../payment-methods/payment-methods.service';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatedOrderDto } from './dto/created-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';
import { OrderDto } from './dto/order.dto';
import { OrdersDto } from './dto/orders.dto';
import { Order } from './entities/order.entity';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller({
  path: 'orders',
})
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly paymentMethodsService: PaymentMethodsService,
    private readonly dataSource: DataSource,
  ) {}

  @Post('')
  @ApiBearerAuth('accessToken')
  @Serialize(CreatedOrderDto)
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: User,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let childErrors: ChildError[] = [];
    try {
      childErrors = await this.ordersService.validateOrder(
        createOrderDto,
        queryRunner.manager,
      );
      if (childErrors.length) {
        throw new ApplicationError(OrderError.CAN_NOT_ORDER, childErrors);
      }
      const car = await queryRunner.manager.findOne(Car, {
        where: { id: createOrderDto.car_ids[0] },
      });

      let promo = null;
      const order = await this.ordersService.createOrder(
        createOrderDto,
        user,
        car,
        promo,
        queryRunner.manager,
      );
      let result: Promise<Order>;
      switch (createOrderDto.payment_method_code) {
        case PaymentMethodCode.Cod:
          result = this.paymentMethodsService.paymentByCod(
            order.id,
            queryRunner.manager,
          );
          break;
        default:
          childErrors;
          throw new ApplicationError(OrderError.CAN_NOT_ORDER);
      }

      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      queryRunner.release();
      throw error;
    }
  }

  @Get('')
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Serialize(OrdersDto)
  async getOrdersByUser(
    @Query() getOrdersDto: GetOrdersDto,
    @I18n() i18n: I18nContext,
    @CurrentUser() user: User,
  ) {
    const result = await this.ordersService.getOrdersByUser(
      getOrdersDto,
      i18n.lang,
      user,
    );
    return result;
  }

  @Get('/:id')
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Serialize(OrderDto)
  async getOrderDetail(
    @Param('id') id: number,
    @I18n() i18n: I18nContext,
    @CurrentUser() user: User,
  ) {
    const result = await this.ordersService.getOrderById(id, i18n.lang, user);

    return result;
  }
}
