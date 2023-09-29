import { Exclude, Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class UserDto {
  @Expose()
  @Transform(({ obj }) => _.get(obj, 'id', null))
  id: number;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'email', null))
  email: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'username', null))
  username: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'firstName', null))
  first_name: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'lastName', null))
  last_name: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'phoneNumber', null))
  phone_number: string;

  @Expose()
  @Transform(({ obj }) => _.get(obj, 'images.0.url', null))
  avatar_url: string;
}
