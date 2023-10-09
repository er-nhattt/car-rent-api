import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationResponseDto } from 'src/common/dto/paginationResponse.dto';
import { CityDto } from './city.dto';

@Exclude()
export class CitiesDto {
  @Expose()
  @Type(() => CityDto)
  items: CityDto[];

  @Expose()
  @Type(() => PaginationResponseDto)
  pagination: PaginationResponseDto;
}