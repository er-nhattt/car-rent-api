import { Exclude, Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class CarDto {
  @Expose()
  @Transform(({ obj }) => _.get(obj, 'id', null))
  id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'languages[0].carName', null))
  name: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'gasoline', null))
  gasoline: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'languages[0].steering', null))
  steering: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'capacity', null))
  capacity: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'newPrice', null))
  new_price: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'oldPrice', null))
  old_price: number;

  @Expose()
  @Transform(({ obj }) =>
    _.get(obj, 'carTypes[0].carType.languages', null).map(
      (item: any) => item.carTypeName,
    ),
  )
  car_types: string[];

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'thumbnailUrl', null))
  thumbnail_url: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'favourite_status', false))
  favourite_status: boolean;
}
