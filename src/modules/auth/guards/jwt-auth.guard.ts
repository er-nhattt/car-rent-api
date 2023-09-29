import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { UserError } from 'src/common/constants';
import { ApplicationError } from 'src/common/error/app.error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new ApplicationError(UserError.UNAUTHORIZED_ACCESS);
    }

    return user;
  }
}
