import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserDto)
  @Post('auth/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get('me')
  getUser(userId: number) {
    return this.usersService.getUserById(userId);
  }
}
