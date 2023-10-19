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
import {
  OrderError,
  OrderStatus,
  PaymentMethodCode,
} from 'src/common/constants';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApplicationError, ChildError } from 'src/common/error/app.error';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { MailService } from 'src/shared/mailer/mail.service';
import { DataSource } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
    private mailService: MailService,
  ) {}

  @Post('')
  @ApiBearerAuth('accessToken')
  @Serialize(CreatedOrderDto)
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: User,
  ) {
    let childErrors: ChildError[] = [];
    const queryRunner = this.dataSource.createQueryRunner();

    childErrors = await this.ordersService.validateOrder(
      createOrderDto,
      queryRunner.manager,
    );

    if (childErrors.length) {
      throw new ApplicationError(OrderError.CAN_NOT_ORDER, childErrors);
    }
    let promo = null;

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const order = await this.ordersService.createOrder(
        createOrderDto,
        user,
        promo,
        queryRunner.manager,
      );
      let result: any;
      switch (createOrderDto.payment_method_code) {
        case PaymentMethodCode.Cod:
          result = await this.paymentMethodsService.paymentByCod(
            order.id,
            queryRunner.manager,
            'en',
          );
          break;
        default:
          childErrors;
          throw new ApplicationError(OrderError.CAN_NOT_ORDER);
      }
      if (
        result.status == OrderStatus.UnPaid ||
        result.status == OrderStatus.Paid
      ) {
        await this.mailService.sendOrderInformationMail(result, user);
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
