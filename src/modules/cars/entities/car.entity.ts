import { Entity, Column, OneToMany, Index } from 'typeorm';
import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { Favourite } from 'src/modules/favourites/entities/favourite.entity';
import { OrderDetail } from 'src/modules/orders/entities/order-detail.entity';
import { CarCarType } from './car-car-type.entity';
import { CarCity } from './car-city.entity';
import { CarLanguage } from './car-language.entity';
import { Image } from 'src/modules/images/entities/image.entity';

@Entity('cars')
export class Car extends BaseEntityAbstract {
  @Column({ name: 'thumbnail_url', nullable: true, type: 'text' })
  thumbnailUrl: string;

  @Column({ nullable: true })
  @Index('idx_cars_capacity')
  capacity: number;

  @Column({ nullable: true })
  gasoline: number;

  @Column({ name: 'old_price', nullable: true, type: 'float' })
  oldPrice: number;

  @Column({ name: 'new_price', nullable: true, type: 'float' })
  @Index('idx_cars_new_price')
  newPrice: number;

  @Column({ name: 'avg_rating', type: 'float', nullable: true })
  avgRating: number;

  @Column({ name: 'total_reviewer', type: 'int', nullable: true })
  totalReviewer: number;

  @OneToMany(() => Image, (image) => image.car, {
    createForeignKeyConstraints: false,
  })
  images: Image[];

  @OneToMany(() => CarCarType, (carCarType) => carCarType.car, {
    createForeignKeyConstraints: false,
  })
  carTypes: CarCarType[];

  @OneToMany(() => CarLanguage, (carLanguage) => carLanguage.car, {
    createForeignKeyConstraints: false,
  })
  languages: CarLanguage[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.car, {
    createForeignKeyConstraints: false,
  })
  orderDetails: OrderDetail[];

  @OneToMany(() => Favourite, (favourite) => favourite.car, {
    createForeignKeyConstraints: false,
  })
  favourites: Favourite[];

  @OneToMany(() => CarCity, (carCity) => carCity.car, {
    createForeignKeyConstraints: false,
  })
  cities: CarCity[];
}
