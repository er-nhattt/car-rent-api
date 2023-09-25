import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntityAbstract extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp')
  createdAt: Date;

  @Column('timestamp')
  updatedAt: Date;

  @Column('timestamp')
  deletedAt: Date;
}
