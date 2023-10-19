import { Exclude, Expose, Type } from 'class-transformer';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { PaymentMethodDto } from './payment-method.dto';

@Exclude()
export class PaymentMethodsDto {
  @Expose()
  @Type(() => PaymentMethodDto)
  items: PaymentMethodDto[];

  @Expose()
  @Type(() => PaginationResponseDto)
  pagination: PaginationResponseDto;
}
