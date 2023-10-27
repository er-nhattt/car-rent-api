import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'system.CUS-0603' })
  @Expose()
  order_detail_id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'system.CUS-0603' })
  @Expose()
  content: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'system.CUS-0603' })
  @Expose()
  rating: number;
}
