import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  OneToMany,
} from 'typeorm';

import { orderStatus } from 'src/common/constants';
import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { PaymentMethod } from 'src/modules/payment-methods/entities/payment-method.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { OrderDetail } from './order-detail.entity';

@Entity('orders')
export class Order extends BaseEntityAbstract {
  @Column({ name: 'user_id', nullable: false })
  @Index('idx_orders_user_id')
  userId: number;

  @ManyToOne(() => User, (user) => user.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'id' })
  user: User;

  @Column({ name: 'order_name', nullable: true })
  orderName: string;

  @Column({ name: 'order_address', nullable: true })
  orderAddress: string;

  @Column({ name: 'order_phone_number', nullable: true })
  orderPhoneNumber: string;

  @Column({ name: 'order_city', nullable: true })
  orderCity: string;

  @Column({ name: 'promo_code', nullable: true })
  promoCode: string;

  @Column({ name: 'promo_type', nullable: true })
  promoType: string;

  @Column({ nullable: true })
  discount: string;

  @Column({ name: 'payment_method_code', nullable: true })
  paymentMethodCode: string;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.orders, {
    createForeignKeyConstraints: false
  })
  @JoinColumn({ name: 'payment_method_code', referencedColumnName: 'code' })
  paymentMethod: PaymentMethod;

  @Column({ name: 'payment_method_type', nullable: true })
  paymentMethodType: string;

  @Column({ name: 'total_price', nullable: true })
  totalPrice: number;

  @Column({ type: 'enum', enum: orderStatus, nullable: true })
  status: orderStatus;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    createForeignKeyConstraints: false
  })
  orderDetails: OrderDetail[];
}
