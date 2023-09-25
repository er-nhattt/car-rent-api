import { Entity, Column, OneToMany, Index } from 'typeorm';

import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { CarTypeLanguage } from 'src/modules/car-types/entities/car-type-language.entity';
import { CarLanguage } from 'src/modules/cars/entities/car-language.entity';

@Entity('languages')
export class Language extends BaseEntityAbstract {
  @Column({ nullable: true })
  @Index('idx_languages_code', { unique: true })
  code: string;

  @OneToMany(() => CarLanguage, (carLanguage) => carLanguage.language, {
    createForeignKeyConstraints: false,
  })
  carLanguages: CarLanguage[];

  @OneToMany(
    () => CarTypeLanguage,
    (carTypeLanguage) => carTypeLanguage.language,
    {
      createForeignKeyConstraints: false,
    },
  )
  carTypeLanguages: CarTypeLanguage[];
}
