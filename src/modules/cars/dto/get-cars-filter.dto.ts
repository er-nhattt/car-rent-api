import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { PaginationRequestDto } from 'src/common/dto/PaginationRequest.dto';

export class GetCarsFilterDto extends PaginationRequestDto {
  @IsOptional()
  @ApiProperty({ required: false })
  name: string;

  @IsOptional()
  @ApiProperty({ required: false, type: 'array', items: { type: 'number' } })
  type: number[];

  @IsOptional()
  @Transform(({ value }) => {
    return value.split(',').map((item: string) => Number(item));
  })
  @ApiProperty({ required: false, type: 'array', items: { type: 'number' } })
  capacity: number[];

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  max_price: number;

  @IsInt({ message: 'system.CUS-0603' })
  @IsOptional()
  @ApiProperty({ required: false })
  pick_up_city_id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  pick_up_at: Date;

  @IsInt({ message: 'system.CUS-0603' })
  @IsOptional()
  @ApiProperty({ required: false })
  drop_off_city_id: number;

  @IsOptional()
  @ApiProperty({ required: false })
  drop_off_at: Date;
}
