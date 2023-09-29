import {
  Body,
  Controller,
  Delete,
  Headers,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { access } from 'fs';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Serialize(LoginResponseDto)
  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Delete('auth/logout')
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  logout(@Headers('authorization') accessToken: string) {
    return this.authService.logout(accessToken.split(' ')[1]);
  }
}
