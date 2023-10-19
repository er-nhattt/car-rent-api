import { Exclude, Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class OrderDetailDto {
  @Expose()
  @Transform(({ obj }) => _.get(obj, 'carId', null))
  car_id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'car.languages[0].name', null))
  name: string;

  @Expose()
  @Transform(({ obj }) =>
    _.get(obj, 'car.carTypes[0].carType.languages', null).map(
      (item: any) => item.carTypeName,
    ),
  )
  car_types: string[];

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'car.thumbnailUrl', null))
  car_thumbnail_url: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'pickUpCity.name', null))
  pick_up_city: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'pickUpAt', null))
  pick_up_at: Date;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'dropOffCity.name', null))
  drop_off_city: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'dropOffAt', null))
  drop_off_at: Date;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'price', null))
  sub_price: number;
}
