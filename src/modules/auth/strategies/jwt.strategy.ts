import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from '../entities/token.entity';
import { ApplicationError } from 'src/common/error/app.error';
import { TokenError, UserError } from 'src/common/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(Token)
    private tokensRepository: Repository<Token>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<User> {
    if (!payload) {
      throw new ApplicationError(TokenError.TOKEN_NOT_FOUND);
    }
    const user: User = await this.usersRepository.findOne({
      where: { id: payload.user.id },
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

    if (!user) {
      throw new ApplicationError(UserError.USER_NOT_FOUND);
    }

    const token: Token = await this.tokensRepository.findOne({
      where: { id: payload.tokenId },
    });

    if (!token) {
      throw new ApplicationError(TokenError.TOKEN_NOT_FOUND);
    }

    if (new Date(payload.expiredAt) < new Date()) {
      throw new ApplicationError(TokenError.TOKEN_EXPIRED);
    }

    return user;
  }
}
