import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { CarDto } from './car.dto';

@Exclude()
export class CarsDto {
  @Expose()
  @Type(() => CarDto)
  items: CarDto[];

  @Expose()
  @Type(() => PaginationResponseDto)
  pagination: PaginationResponseDto;
}
