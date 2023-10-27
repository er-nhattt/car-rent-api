import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { OrderDetail } from 'src/modules/orders/entities/order-detail.entity';
import { User } from 'src/modules/users/entities/user.entity';

import { Entity, Column, ManyToOne, JoinColumn, Index, OneToOne } from 'typeorm';

@Entity('reviews')
export class Review extends BaseEntityAbstract {
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.reviews, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ name: 'order_detail_id', nullable: true })
  orderDetailId: number;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.review, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'order_detail_id', referencedColumnName: 'id' })
  orderDetail: OrderDetail;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @Column({ type: 'tinyint', nullable: true })
  rating: number;
}
