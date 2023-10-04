import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { Steering } from 'src/common/constants';
import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { Language } from 'src/modules/languages/entities/language.entity';
import { Car } from './car.entity';

@Entity('car_languages')
@Index('idx_car_languages_language_code_car_id', ['languageCode', 'carId'])
export class CarLanguage extends BaseEntityAbstract {
  @Column({ name: 'language_code', nullable: true })
  languageCode: string;

  @ManyToOne(() => Language, (language) => language.carLanguages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'language_code', referencedColumnName: 'code' })
  language: Language;

  @Column({ name: 'car_id', nullable: true })
  carId: number;

  @ManyToOne(() => Car, (car) => car.languages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
  car: Car;

  @Index('idx_car_languages_car_name', { fulltext: true })
  @Column({ name: 'car_name', nullable: true })
  carName: string;

  @Column({ name: 'car_description', nullable: true, type: 'text' })
  carDescription: string;

  @Column({ type: 'enum', enum: Steering, nullable: true })
  steering: Steering;
}
