import { Exclude, Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class CityDto {
  @Expose()
  @Transform(({ obj }) => _.get(obj, 'cityId', null))
  id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'city.name', null))
  name: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'cityType', null))
  type: number;
}
