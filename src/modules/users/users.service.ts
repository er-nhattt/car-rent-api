import { Injectable, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { User } from './entities/user.entity';
import { ApplicationError, ChildError } from 'src/common/error/app.error';
import { EMAIL_REGEX, SystemError, UserError } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserById(userId: number): Promise<User> {
    return await this.usersRepository
      .createQueryBuilder('users')
      .where('user.id = :id', { id: userId })
      .getOne();
  }

  async createUser(newUser: CreateUserDto) {
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
      throw new ApplicationError(UserError.USERNAME_ALREADY_EXISTED);
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
      throw new ApplicationError(UserError.SIGNUP_FAILURE, childErrors);
    }

    const saltOrRounds = 10;
    newUser.hashed_password = await bcrypt.hash(newUser.password, saltOrRounds);
    return await this.usersRepository.save(
      this.usersRepository.create({
        username: newUser.username,
        firstName: newUser.first_name,
        lastName: newUser.last_name,
        phoneNumber: newUser.phone_number,
        email: newUser.email,
        hashedPassword: newUser.hashed_password,
      }),
    );
  }
}
