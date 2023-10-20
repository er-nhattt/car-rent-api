import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginResponseDto {
  @Expose()
  access_token: string;

  @Expose()
  expired_access_token_at: string;

  @Expose()
  refresh_token: string;

  @Expose()
  expired_refresh_token_at: string;
}
