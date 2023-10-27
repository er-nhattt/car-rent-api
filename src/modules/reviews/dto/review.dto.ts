import { Exclude, Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class ReviewDto {
  @Transform(({ obj }) => _.get(obj, 'user.username'))
  @Expose()
  username: string;

  @Transform(({ obj }) => _.get(obj, 'user.firstName'))
  @Expose()
  first_name: string;

  @Transform(({ obj }) => _.get(obj, 'user.lastName'))
  @Expose()
  last_name: string;

  @Transform(({ obj }) => _.get(obj, 'user.avatarUrl'))
  @Expose()
  avatar_url: string;

  @Transform(({ obj }) => _.get(obj, 'content'))
  @Expose()
  content: string;

  @Transform(({ obj }) => _.get(obj, 'rating'))
  @Expose()
  rating: number;

  @Transform(({ obj }) => _.get(obj, 'createdAt'))
  @Expose()
  created_at: string;
}
