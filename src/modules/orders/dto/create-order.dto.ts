import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaymentMethodCode } from 'src/common/constants';

export class CreateOrderDto {
  @Transform(({ value }) => {
    return value.split(',').map((item: string) => Number(item));
  })
  @ApiProperty({ required: true, type: 'array', items: { type: 'number' } })
  car_ids: number[];

  @IsNotEmpty({message: 'co loi'})
  @IsString()
  @ApiProperty({ required: true })
  order_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  order_phone_number: string;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  order_address: string;

  @IsNotEmpty()
  @ApiProperty({ required: false })
  order_city: string;

  @IsInt()
  @ApiProperty({ required: true })
  pick_up_city_id: number;

  @IsInt()
  @ApiProperty({ required: true })
  drop_off_city_id: number;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  pick_up_at: Date;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  drop_off_at: Date;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: 'enum', enum: PaymentMethodCode })
  payment_method_code: PaymentMethodCode;

  @IsOptional()
  @ApiProperty({ required: false })
  promo_code: string;
}
