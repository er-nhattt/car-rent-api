import { Exclude, Expose, Transform } from 'class-transformer';
import * as _ from 'lodash';

@Exclude()
export class LoginResponseDto {
  @Expose()
  access_token: string;

  @Expose()
  refresh_token: string;
}
