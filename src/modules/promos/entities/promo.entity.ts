import { PromoType } from 'src/common/constants';
import { BaseEntityAbstract } from 'src/common/entities/base.entity';

import { Entity, Column, Index } from 'typeorm';

@Entity('promos')
export class Promo extends BaseEntityAbstract {
  @Column({ nullable: true })
  @Index('idx_promos_code')
  code: string;

  @Column({ type: 'enum', nullable: true, enum: PromoType })
  type: PromoType;

  @Column({ nullable: true, type: 'float' })
  discount: number;

  @Column({ nullable: true })
  quantity: number;
}
