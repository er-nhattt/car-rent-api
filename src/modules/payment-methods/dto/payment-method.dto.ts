import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaymentMethodDto {
  @Expose()
  id: number;

  @Expose()
  code: string;

  @Expose()
  name: string;
}
