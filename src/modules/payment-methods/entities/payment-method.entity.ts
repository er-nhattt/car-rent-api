import { Entity, Column, OneToMany } from 'typeorm';

import { PaymentMethodType } from 'src/common/constants';
import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { Order } from 'src/modules/orders/entities/order.entity';

@Entity('payment_methods')
export class PaymentMethod extends BaseEntityAbstract {
  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Order, (order) => order.paymentMethod, {
    createForeignKeyConstraints: false,
  })
  orders: Order[];
}
