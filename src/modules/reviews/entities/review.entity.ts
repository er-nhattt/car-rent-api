import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { OrderDetail } from 'src/modules/orders/entities/order-detail.entity';
import { User } from 'src/modules/users/entities/user.entity';

import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

@Entity('reviews')
export class Review extends BaseEntityAbstract {
  @Column({ name: 'user_id', nullable: true })
  @Index('idx_reviews_user_id')
  userId: number;

  @ManyToOne(() => User, (user) => user.reviews, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ name: 'order_detail_id', nullable: true })
  @Index('idx_reviews_order_detail_id')
  orderDetailId: number;

  @ManyToOne(() => OrderDetail, (orderDetail) => orderDetail.reviews, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'order_detail_id', referencedColumnName: 'id' })
  orderDetail: OrderDetail;

  @Column({ nullable: true, type: 'text' })
  content: string;

  @Column({ type: 'tinyint', nullable: true })
  rating: number;
}
