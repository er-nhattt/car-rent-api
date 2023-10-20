import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'system.CUS-0001' })
  refresh_token: string;
}
