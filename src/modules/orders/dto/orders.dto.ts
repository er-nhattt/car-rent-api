import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { OrderDto } from './order.dto';

@Exclude()
export class OrdersDto {
  @Expose()
  @Type(() => OrderDto)
  items: OrderDto[];

  @Expose()
  @Type(() => PaginationResponseDto)
  pagination: PaginationResponseDto;
}
