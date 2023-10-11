import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApplicationError, ChildError } from 'src/common/error/app.error';
import { REGEX_USERNAME, SystemError, UserError } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUserById(user: User): Promise<User> {
    const result = await this.usersRepository.findOne({
      where: { id: user.id },
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

    return result;
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    const childErrors: ChildError[] = [];

    if (
      typeof newUser.username === 'number' ||
      typeof Number(newUser.username) === 'number' ||
      !newUser.username.match(REGEX_USERNAME)
    ) {
      throw new ApplicationError(UserError.SIGNUP_FAILURE, [
        { key: SystemError.INVALID_PARAMETER, field: 'username' },
      ]);
    }

    const existedUser = await this.usersRepository.findOne({
      where: { username: newUser.username },
    });

    if (existedUser) {
      throw new ApplicationError(UserError.SIGNUP_FAILURE, [
        { key: UserError.USERNAME_ALREADY_EXISTED, field: 'username' },
      ]);
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(newUser.password, saltOrRounds);
    return this.usersRepository.save({
      username: newUser.username,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      phoneNumber: newUser.phone_number,
      email: newUser.email,
      hashedPassword,
    });
  }
}
