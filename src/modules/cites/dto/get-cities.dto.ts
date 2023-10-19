import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { PaginationRequestDto } from 'src/common/dto/pagination-request.dto';

export class GetCitiesDto extends PaginationRequestDto {
  @IsOptional()
  @ApiProperty({ required: false })
  car_id: number;

  @IsOptional()
  @ApiProperty({ required: true, example: 'pickUp' })
  type: string;
}
