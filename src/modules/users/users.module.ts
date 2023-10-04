import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from '../auth/entities/token.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  exports: [UsersService, JwtService],
})
export class UsersModule {}
