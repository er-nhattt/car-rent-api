import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ example: 'username123' })
  username: string;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ example: 'John' })
  first_name: string;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ example: 'Tran' })
  last_name: string;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ example: '0923029374' })
  phone_number: string;

  @IsEmail({}, { message: 'user.USE-0001' })
  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @MinLength(8, { message: 'user.USE-0002' })
  @ApiProperty()
  password: string;
}
