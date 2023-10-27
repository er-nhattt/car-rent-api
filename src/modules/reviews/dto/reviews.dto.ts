import { Exclude, Expose, Transform, Type } from 'class-transformer';
import * as _ from 'lodash';
import { PaginationResponseDto } from 'src/common/dto/pagination-response.dto';
import { ReviewDto } from './review.dto';

@Exclude()
export class ReviewsDto {
  @Type(() => ReviewDto)
  @Expose()
  items: ReviewDto[];

  @Type(() => PaginationResponseDto)
  @Expose()
  pagination: PaginationResponseDto;
}
