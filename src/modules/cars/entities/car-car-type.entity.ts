import { Entity, Column, Index, ManyToOne, JoinColumn } from 'typeorm';

import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { CarType } from 'src/modules/car-types/entities/car-type.entity';
import { Car } from './car.entity';

@Entity('car_car_types')
export class CarCarType extends BaseEntityAbstract {
  @Column({ name: 'car_id', nullable: true })
  @Index('idx_car_car_types_car_id')
  carId: number;

  @ManyToOne(() => Car, (car) => car.carTypes, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
  car: Car;

  @Column({ name: 'car_type_id', nullable: true })
  @Index('idx_car_car_types_car_type_id')
  carTypeId: number;

  @ManyToOne(() => CarType, (carType) => carType.cars, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_type_id', referencedColumnName: 'id' })
  carType: CarType;
}
