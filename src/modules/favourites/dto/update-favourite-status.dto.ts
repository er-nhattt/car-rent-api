import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsBooleanString, IsInt, IsNotEmpty } from 'class-validator';

export class UpdateFavouriteStatusDto {
  @ApiProperty({ example: true })
  @IsBoolean({ message: 'system.CUS-0603' })
  status: boolean;

  @IsInt({ message: 'system.CUS-0603' })
  @ApiProperty({ example: 1 })
  car_id: number;
}
