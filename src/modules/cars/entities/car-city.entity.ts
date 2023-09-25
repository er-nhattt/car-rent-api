import { Entity, Column, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { City } from 'src/modules/cites/entities/city.entity';
import { Car } from './car.entity';

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

  @Column({ name: 'pick_up_city_id', nullable: true })
  @Index('idx_car_cities_pick_up_city_id')
  pickUpCityId: number;

  @ManyToOne(() => City, (city) => city.pickUpCars, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'pick_up_city_id', referencedColumnName: 'id' })
  pickUpCity: City;
  
  @Column({ name: 'drop_off_city_id', nullable: true })
  @Index('idx_car_cities_drop_off_city_id')
  dropOffCityId: number;

  @ManyToOne(() => City, (city) => city.dropOffCars, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'drop_off_city_id', referencedColumnName: 'id' })
  dropOffCity: City;
}
