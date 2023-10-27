import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, ManyToOne, JoinColumn, BeforeUpdate } from 'typeorm';
import { Cache } from 'cache-manager';

@Entity('favourites')
export class Favourite extends BaseEntityAbstract {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {
    super();
  }
  @BeforeUpdate()
  clearCache() {
    this.cacheManager.reset();
  }
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.favourites, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @Column({ name: 'car_id', nullable: true })
  carId: number;

  @ManyToOne(() => Car, (car) => car.favourites, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
  car: Car;
}
