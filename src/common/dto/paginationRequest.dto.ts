import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationRequestDto {
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: true, type: 'number' })
  @IsInt({ message: 'system.CUS-0603' })
  page: number;
}
