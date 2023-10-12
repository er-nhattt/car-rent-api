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
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync({
        tokenId,
        user: restUser,
        expriedAt: moment()
          .add(process.env.JWT_EXPIRED_ACCESS_TOKEN_IN, 's')
          .format(),
      }),
      this.jwtService.signAsync({
        tokenId,
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

  async login(loginDto: LoginDto): Promise<{
    access_token: string;
    refresh_token: string;
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
      refresh_token: generateTokens.refreshToken,
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
