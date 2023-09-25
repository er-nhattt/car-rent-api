import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { Language } from 'src/modules/languages/entities/language.entity';
import { CarType } from './car-type.entity';

@Entity('car_type_languages')
@Index('idx_car_type_languages_languages_code_car_type_id', [
  'languageCode',
  'carTypeId',
])
export class CarTypeLanguage extends BaseEntityAbstract {
  @Column({ name: 'language_code', nullable: true })
  languageCode: string;

  @ManyToOne(() => Language, (language) => language.carTypeLanguages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'language_code', referencedColumnName: 'code' })
  language: Language;

  @Column({ name: 'car_type_id', nullable: true })
  carTypeId: number;

  @ManyToOne(() => CarType, (carType) => carType.languages, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_type_id', referencedColumnName: 'id' })
  carType: CarType;

  @Column({ name: 'car_type_name', nullable: true })
  @Index('idx_car_type_languages_car_type_name')
  carTypeName: string;
}
