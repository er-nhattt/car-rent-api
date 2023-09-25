import { Entity, Column, Index, OneToMany } from 'typeorm';

import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { Token } from 'src/modules/auth/entities/token.entity';
import { Favourite } from 'src/modules/favourites/entities/favourite.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';

@Entity('users')
export class User extends BaseEntityAbstract {
  @Column({ unique: true })
  @Index('idx_users_username', { unique: true })
  username: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  email: string;

  @Column({ name: 'hashed_password' })
  hashedPassword: string;

  @OneToMany(() => Token, (token) => token.user, {
    createForeignKeyConstraints: false,
  })
  tokens: Token[];

  @OneToMany(() => Review, (review) => review.user, {
    createForeignKeyConstraints: false,
  })
  reviews: Review[];

  @OneToMany(() => Order, (order) => order.user, {
    createForeignKeyConstraints: false,
  })
  orders: Order[];

  @OneToMany(() => Favourite, (favourite) => favourite.user, {
    createForeignKeyConstraints: false,
  })
  favourites: Favourite[];
}
