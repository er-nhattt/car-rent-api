import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as moment from 'moment';
import { SystemError, UserError } from 'src/common/constants';
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

  async generateTokens(user: User, tokenId: number) {
    const { hashedPassword, ...restUser } = user;

    const expiredAccessTokenAt = moment()
      .add(process.env.JWT_EXPIRED_ACCESS_TOKEN_IN, 's')
      .format();

    const accessToken = await this.jwtService.signAsync({
      tokenId,
      user: restUser,
      expiredAt: expiredAccessTokenAt,
    });

    const expiredRefreshTokenAt = moment()
      .add(process.env.JWT_EXPIRED_REFRESH_TOKEN_IN, 's')
      .format();

    const refreshToken = await this.jwtService.signAsync({
      tokenId,
      user: restUser,
      expiredAt: expiredRefreshTokenAt,
    });

    return {
      accessToken,
      expiredAccessTokenAt,
      refreshToken,
      expiredRefreshTokenAt,
    };
  }

  async login(loginDto: LoginDto): Promise<{
    access_token: string;
    expired_access_token_at: string;
    refresh_token: string;
    expired_refresh_token_at: string;
  }> {
    const user: User = await this.usersRepository.findOne({
      where: { username: loginDto.username },
      select: [
        'id',
        'username',
        'firstName',
        'lastName',
        'avatarUrl',
        'email',
        'phoneNumber',
        'hashedPassword',
      ],
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

    const generateTokens = await this.generateTokens(user, token.id);

    return {
      access_token: generateTokens.accessToken,
      expired_access_token_at: generateTokens.expiredAccessTokenAt,
      refresh_token: generateTokens.refreshToken,
      expired_refresh_token_at: generateTokens.expiredRefreshTokenAt,
    };
  }

  async logout(accessToken: string) {
    const decoded: any = this.jwtService.decode(accessToken);
    const existedToken: Token = await this.tokensRepository.findOne({
      where: { id: decoded.tokenId },
    });
    if (existedToken) {
      this.tokensRepository.softDelete({
        id: existedToken.id,
      });
      return {
        message: 'Logout success',
      };
    } else {
      throw new ApplicationError(SystemError.OBJECT_NOT_FOUND);
    }
  }
}
