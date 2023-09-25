import { Entity, OneToMany } from 'typeorm';


import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { CarCarType } from 'src/modules/cars/entities/car-car-type.entity';
import { CarTypeLanguage } from './car-type-language.entity';

@Entity('car_types')
export class CarType extends BaseEntityAbstract {
  @OneToMany(() => CarCarType, (carCarType) => carCarType.carType, {
    createForeignKeyConstraints: false,
  })
  cars: CarCarType[];

  @OneToMany(
    () => CarTypeLanguage,
    (carTypeLanguage) => carTypeLanguage.carType,
    {
      createForeignKeyConstraints: false,
    },
  )
  languages: CarTypeLanguage[];
}
