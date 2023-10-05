import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class PaginationResponseDto {
  @Expose()
  total: number;

  @Expose()
  limit: number;

  @Expose()
  offset: number;
}
