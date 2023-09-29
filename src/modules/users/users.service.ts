import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { ApplicationError, ChildError } from 'src/common/error/app.error';
import { EMAIL_REGEX, UserError } from 'src/common/constants';
import { plainToClass } from '@nestjs/class-transformer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserById(userId: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id: userId },
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'avatarUrl',
        'email',
        'phoneNumber',
      ],
    });
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    const childErrors: ChildError[] = [];
    const existedUser = await this.usersRepository.findOne({
      where: { username: newUser.username },
    });

    if (existedUser) {
      const childError = {
        key: UserError.USERNAME_ALREADY_EXISTED,
        field: 'username',
      };
      childErrors.push(childError);
    }
    if (!EMAIL_REGEX.test(newUser.email)) {
      const childError = {
        key: UserError.INVALID_EMAIL,
        field: 'email',
      };
      childErrors.push(childError);
    }
    if (newUser.password.length < 9) {
      const childError = {
        key: UserError.INVALID_PASSWORD,
        field: 'password',
      };
      childErrors.push(childError);
    }

    if (childErrors.length) {
      if (childErrors.length === 1) {
        throw new ApplicationError(childErrors[0].key);
      } else {
        throw new ApplicationError(UserError.SIGNUP_FAILURE, childErrors);
      }
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltOrRounds);
    return await this.usersRepository.save({
      username: newUser.username,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      phoneNumber: newUser.phone_number,
      email: newUser.email,
      hashedPassword,
    });
  }
}
