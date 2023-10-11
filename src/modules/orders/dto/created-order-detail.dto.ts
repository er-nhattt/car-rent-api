import { Exclude, Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class CreatedOrderDetailDto {
  @Expose()
  @Transform(({ obj }) => _.get(obj, 'carId', null))
  car_id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'pickUpCityId', null))
  pick_up_city_id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'pickUpAt', null))
  pick_up_at: Date;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'dropOffCityId', null))
  drop_off_city_id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'dropOffAt', null))
  drop_off_at: Date;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'price', null))
  price: number;
}
