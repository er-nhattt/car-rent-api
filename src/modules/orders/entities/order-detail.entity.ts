import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { City } from 'src/modules/cites/entities/city.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { Order } from './order.entity';

@Entity('order-details')
export class OrderDetail extends BaseEntityAbstract {
  @Column({ name: 'order_id', nullable: true })
  orderId: number;

  @ManyToOne(() => Order, (order) => order.details, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'order_id', foreignKeyConstraintName: 'id' })
  order: Order;

  @Column({ name: 'car_id', nullable: true })
  carId: number;

  @ManyToOne(() => Car, (car) => car.orderDetails, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_id', foreignKeyConstraintName: 'id' })
  car: Car;

  @Column({ name: 'pick_up_city_id', nullable: true })
  pickUpCityId: number;

  @ManyToOne(() => City, (city) => city.pickUpOrderDetails, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'pick_up_city_id', referencedColumnName: 'id' })
  pickUpCity: City;

  @Column({ name: 'drop_off_city_id', nullable: true })
  dropOffCityId: number;

  @ManyToOne(() => City, (city) => city.dropOffOrderDetails, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'drop_off_city_id', referencedColumnName: 'id' })
  dropOffCity: City;

  @OneToMany(() => Review, (review) => review.orderDetail, {
    createForeignKeyConstraints: false,
  })
  reviews: Review[];

  @Column({ name: 'pick_up_at', nullable: true })
  pickUpAt: Date;

  @Column({ name: 'drop_off_at', nullable: true })
  dropOffAt: Date;

  @Column({ nullable: true })
  price: number;
}
