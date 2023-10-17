import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMethod } from '../payment-methods/entities/payment-method.entity';
import { PaymentMethodsModule } from '../payment-methods/payment-methods.module';
import { PaymentMethodsService } from '../payment-methods/payment-methods.service';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderDetail]), PaymentMethodsModule],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
