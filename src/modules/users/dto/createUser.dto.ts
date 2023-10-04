import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@Exclude()
export class CreateUserDto {
  @ApiProperty({ example: 'username123' })
  @Expose()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'John' })
  @Expose()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Tran' })
  @Expose()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: '0923029374' })
  @Expose()
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @Expose()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
