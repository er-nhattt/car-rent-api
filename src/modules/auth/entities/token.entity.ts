import { BaseEntityAbstract } from 'src/common/entities/base.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm';

@Entity('tokens')
export class Token extends BaseEntityAbstract {
  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.tokens, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
