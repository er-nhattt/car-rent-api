import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';
import { PaginationRequestDto } from 'src/common/dto/pagination-request.dto';

@Exclude()
export class GetReviewsDto extends PaginationRequestDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'system.CUS-0603' })
  @Type(() => Number)
  @IsInt({ message: 'system.CUS-0603' })
  @Expose()
  car_id: number;
}
