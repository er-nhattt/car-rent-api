import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { CarTypeDto } from './car-type.dto';

@Exclude()
export class CarTypesDto {
  @Expose()
  @Type(() => CarTypeDto)
  items: CarTypeDto[];

  @Expose()
  @Type(() => PaginationResponseDto)
  pagination: PaginationResponseDto;
}
