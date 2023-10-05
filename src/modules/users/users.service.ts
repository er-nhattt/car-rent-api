import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';
import { ApplicationError, ChildError } from 'src/common/error/app.error';
import { EMAIL_REGEX, UserError } from 'src/common/constants';
import { JwtService } from '@nestjs/jwt';
import { Token } from '../auth/entities/token.entity';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
  ) {}

  async getUserById(accessToken: string): Promise<User> {
    const decoded: any = this.jwtService.decode(accessToken);
    const existedToken: Token = await this.tokensRepository.findOne({
      where: { id: decoded.tokenId },
    });
    const result = await this.usersRepository.findOne({
      where: { id: existedToken.userId },
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
