import { Entity, Column, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { City } from 'src/modules/cites/entities/city.entity';
import { Car } from './car.entity';
import { CityType } from 'src/common/constants';

@Entity('car_cities')
export class CarCity extends BaseEntityAbstract {
  @Column({ name: 'car_id', nullable: true })
  @Index('idx_car_cities_car_id')
  carId: number;

  @ManyToOne(() => Car, (car) => car.cities, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
  car: Car;

  @Column({ name: 'city_id', nullable: true })
  @Index('idx_car_cities_city_id')
  cityId: number;

  @ManyToOne(() => City, (city) => city.carCity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city: City;

  @Column({ name: 'city_type', nullable: true, type: 'enum', enum: CityType })
  cityType: CityType;
}
