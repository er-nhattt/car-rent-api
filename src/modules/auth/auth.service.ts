import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { UserError } from 'src/common/constants';
import { ApplicationError } from 'src/common/error/app.error';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { Token } from './entities/token.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getTokens(user: User, tokenId: number) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        tokenId: tokenId,
        user,
        expriedAt: moment()
          .add(process.env.JWT_EXPIRED_ACCESS_TOKEN_IN, 's')
          .format(),
      }),
      this.jwtService.signAsync({
        tokenId: tokenId,
        userId: user.id,
        expriedAt: moment()
          .add(process.env.JWT_EXPIRED_REFRESH_TOKEN_IN, 's')
          .format(),
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { username: loginDto.username },
    });

    if (
      !user ||
      !(await bcrypt.compare(loginDto.password, user.hashedPassword))
    ) {
      throw new ApplicationError(UserError.WRONG_CREDENTIALS);
    }

    const token = await this.tokensRepository.save({
      userId: user.id,
    });

    const generateTokens = await this.getTokens(user, token.id);

    return {
      access_token: generateTokens.accessToken,
      refresh_token: generateTokens.refreshToken,
    };
  }
}
