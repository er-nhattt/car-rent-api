import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { OrderDetail } from 'src/modules/orders/entities/order-detail.entity';
import { CarCity } from 'src/modules/cars/entities/car-city.entity';

@Entity('cities')
export class City extends BaseEntityAbstract {
  @Column({ nullable: true })
  name: string;

  @OneToMany(() => CarCity, (carCity) => carCity.city, {
    createForeignKeyConstraints: false,
  })
  carCity: CarCity[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.pickUpCity, {
    createForeignKeyConstraints: false,
  })
  pickUpOrderDetails: OrderDetail[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.dropOffCity, {
    createForeignKeyConstraints: false,
  })
  dropOffOrderDetails: OrderDetail[];
}
