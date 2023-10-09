import { Exclude, Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class CityDto {
  @Expose()
  @Transform(({ obj }) => _.get(obj, 'carId', null))
  car_id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'cityId', null))
  city_id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'city.name', null))
  city_name: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'cityType', null))
  city_type: number;
}
