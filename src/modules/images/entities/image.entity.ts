import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { Car } from 'src/modules/cars/entities/car.entity';

@Entity('images')
@Index('idx_images_object_id_object_type', ['objectId', 'objectType'])
export class Image extends BaseEntityAbstract {
  @Column({ name: 'object_id', nullable: true })
  objectId: number;

  @ManyToOne(() => Car, (car) => car.images, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'object_id', referencedColumnName: 'id' })
  car: Car;

  @Column({ nullable: true })
  url: string;

  @Column({ name: 'object_type', nullable: true })
  objectType: string;
}
