import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderError } from 'src/common/constants';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ApplicationError, ChildError } from 'src/common/error/app.error';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { DataSource } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Car } from '../cars/entities/car.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreatedOrderDto } from './dto/created-order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller({
  path: 'orders',
})
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
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
      await queryRunner.commitTransaction();
      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      queryRunner.release();
      throw error;
    }
  }
}
