import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { PaymentMethodCode } from 'src/common/constants';

export class CreateOrderDto {
  @IsArray({ message: 'system.CUS-0603' })
  @Transform(({ value }) => {
    return value && value.split(',').map((item: string) => Number(item));
  })
  @ApiProperty({ required: true, type: 'array', items: { type: 'number' } })
  car_ids: number[];

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ required: true })
  order_name: string;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ required: true })
  order_phone_number: string;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ required: false })
  order_address: string;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ required: false })
  order_city: string;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @IsInt({ message: 'order.ORD-0002' })
  @ApiProperty({ required: true })
  pick_up_city_id: number;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @IsInt({ message: 'order.ORD-0003' })
  @ApiProperty({ required: true })
  drop_off_city_id: number;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ required: true })
  pick_up_at: Date;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ required: true })
  drop_off_at: Date;

  @IsNotEmpty({ message: 'system.CUS-0001' })
  @ApiProperty({ required: true, type: 'enum', enum: PaymentMethodCode })
  payment_method_code: PaymentMethodCode;

  @IsOptional()
  @ApiProperty({ required: false })
  promo_code: string;
}
