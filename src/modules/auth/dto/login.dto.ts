import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'username123' })
  @IsNotEmpty({ message: 'system.CUS-0001' })
  username: string;

  @ApiProperty({ example: '123456789' })
  @IsNotEmpty({ message: 'system.CUS-0001' })
  password: string;
}
