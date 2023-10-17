import { Exclude, Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class CarTypeDto {
  @Expose()
  @Transform(({ obj }) => _.get(obj, 'carTypeId', null))
  id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'carTypeName', null))
  name: string;
}
