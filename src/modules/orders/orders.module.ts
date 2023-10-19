import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from 'src/shared/mailer/mail.module';
import { MailService } from 'src/shared/mailer/mail.service';
import { Car } from '../cars/entities/car.entity';
import { City } from '../cites/entities/city.entity';
import { PaymentMethodsModule } from '../payment-methods/payment-methods.module';
import { OrderDetail } from './entities/order-detail.entity';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail, Car]),
    PaymentMethodsModule,
    BullModule.registerQueue({ name: 'mail' }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, MailService],
})
export class OrdersModule {}
