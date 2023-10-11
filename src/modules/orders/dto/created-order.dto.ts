import { Exclude, Expose, Transform, Type } from 'class-transformer';
import * as _ from 'lodash';
import { CreatedOrderDetailDto } from './created-order-detail.dto';

@Exclude()
export class CreatedOrderDto {
  @Expose()
  @Transform(({ obj }) => _.get(obj, 'id', null))
  order_id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'userId', null))
  user_id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'orderName', null))
  order_name: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'orderAddress', null))
  order_address: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'orderPhoneNumber', null))
  order_phone_number: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'orderCity', null))
  order_city: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'promoCode', null))
  promo_code: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'promoType', null))
  promo_type: string;
  @Expose()
  @Transform(({ obj }) => _.get(obj, 'discount', null))
  discount: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'totalPrice', null))
  total_price: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'paymentMethodCode', null))
  payment_method_code: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'status', null))
  status: string;

  @Expose()
  @Type(() => CreatedOrderDetailDto)
  details: CreatedOrderDetailDto[];
}
