import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

@Exclude()
export class PaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: true, type: 'number' })
  @IsInt({ message: 'system.CUS-0603' })
  @Expose()
  page: number;
}
