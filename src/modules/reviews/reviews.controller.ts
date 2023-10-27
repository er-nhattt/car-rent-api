import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { result } from 'lodash';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { Serialize } from 'src/common/interceptors/tranform-interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewsDto } from './dto/get-reviews.dto';
import { ReviewsDto } from './dto/reviews.dto';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller({
  path: 'reviews',
})
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @Post('')
  async createReview(
    @Body() createReviewDto: CreateReviewDto,
    @CurrentUser() user: User,
  ) {
    console.log('createReviewDto:', createReviewDto);
    const result = await this.reviewsService.createReview(
      createReviewDto,
      user,
    );

    return result;
  }

  @Get()
  @Serialize(ReviewsDto)
  async getReviewsByCarId(@Query() getReviewsDto: GetReviewsDto) {
    const result = await this.reviewsService.getReviewsByCarId(getReviewsDto);
    return result;
  }
}
