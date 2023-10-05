import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto)
  @Post('auth/signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.createUser(createUserDto);
    return result;
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get('me')
  async getUser(@Headers('authorization') accessToken: string) {
    const result = await this.usersService.getUserById(
      accessToken.split(' ')[1],
    );
    return result;
  }
}
