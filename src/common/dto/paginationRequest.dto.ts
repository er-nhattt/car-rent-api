import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class PaginationRequestDto {
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false, type: 'number' })
    offset: number;
  
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({ required: false, type: 'number' })
    limit: number;
  }