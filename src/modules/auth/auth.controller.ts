import {
  Body,
  Controller,
  Delete,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
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
    console.log('loginDto:', loginDto);
    const result = await this.authService.login(loginDto);
    return result;
  }

  @Delete('auth/logout')
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  async logout(@Headers('authorization') accessToken: string) {
    const result = await this.authService.logout(accessToken.split(' ')[1]);
    return result;
  }
}
