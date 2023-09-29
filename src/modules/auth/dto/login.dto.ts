import { Exclude, Expose } from '@nestjs/class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

@Exclude()
export class LoginDto {
  @ApiProperty({example: 'username123'})
  @Expose()
  username: string;

  @Expose()
  @ApiProperty({example: '123456789'})
  @MinLength(6)
  password: string;
}
