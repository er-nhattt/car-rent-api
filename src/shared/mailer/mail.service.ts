import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Order } from 'src/modules/orders/entities/order.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private readonly mailQueue: Queue) {}

  async sendOrderInformationMail(order: Order, user: User) {
    console.log('Send mail ...');
    await this.mailQueue.add('order-information', {
      order,
      user,
    });
  }
}
