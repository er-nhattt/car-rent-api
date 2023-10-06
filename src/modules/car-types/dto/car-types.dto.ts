import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationResponseDto } from 'src/common/dto/paginationResponse.dto';
import { CarTypeDto } from './car-type.dto';

@Exclude()
export class CarTypesDto {
  @Expose()
  items: any;

  @Expose()
  @Type(() => PaginationResponseDto)
  pagination: PaginationResponseDto;
}
