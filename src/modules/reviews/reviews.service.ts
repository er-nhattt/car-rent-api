import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sum } from 'lodash';
import {
  ReviewError,
  REVIEW_LIMIT_PAGINATION,
  SystemError,
} from 'src/common/constants';
import { ApplicationError } from 'src/common/error/app.error';
import { Repository } from 'typeorm';
import { Car } from '../cars/entities/car.entity';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { GetReviewsDto } from './dto/get-reviews.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,

    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,

    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  async createReview(createReviewDto: CreateReviewDto, user: User) {
    if (
      createReviewDto.rating > 5 ||
      createReviewDto.rating < 1 ||
      !Number.isInteger(createReviewDto.rating)
    ) {
      throw new ApplicationError(ReviewError.CAN_NOT_REVIEW, [
        {
          key: SystemError.INVALID_PARAMETER,
          field: 'rating',
        },
      ]);
    }

    const order = await this.ordersRepository.findOne({
      where: {
        userId: user.id,
        details: {
          id: createReviewDto.order_detail_id,
        },
      },
      relations: {
        details: true,
      },
    });

    if (!order) {
      throw new ApplicationError(ReviewError.NOT_RENT_YET);
    }

    const review = await this.reviewsRepository.findOne({
      where: {
        userId: user.id,
        orderDetailId: order.details[0].id,
      },
    });

    if (review) {
      throw new ApplicationError(ReviewError.REVIEW_ALREADY_EXISTED);
    }

    if (new Date(order.details[0].dropOffAt) > new Date()) {
      throw new ApplicationError(ReviewError.CAN_NOT_REVIEW);
    }

    await this.reviewsRepository.save({
      userId: user.id,
      orderDetailId: createReviewDto.order_detail_id,
      content: createReviewDto.content,
      rating: createReviewDto.rating,
    });

    const car = await this.carsRepository.findOne({
      where: {
        id: order.details[0].carId,
      },
    });

    const reviews = await this.reviewsRepository.find({
      where: {
        orderDetail: {
          carId: car.id,
        },
      },
    });

    car.totalReviewer = car.totalReviewer + 1;
    const sumReview = reviews.reduce(
      (total, currentValue) => total + currentValue.rating,
      0,
    );
    car.avgRating = Number((sumReview / reviews.length).toFixed(2));

    await this.carsRepository.save(car);
  }

  async getReviewsByCarId(getReviewsDto: GetReviewsDto) {
    const offset = REVIEW_LIMIT_PAGINATION * (getReviewsDto.page - 1);
    const [data, total] = await this.reviewsRepository.findAndCount({
      where: {
        orderDetail: {
          carId: getReviewsDto.car_id,
        },
      },
      skip: offset,
      take: REVIEW_LIMIT_PAGINATION,
      relations: {
        user: true,
      },
    });

    console.log(data);

    return {
      items: data,
      pagination: {
        total: data.length,
        offset,
        limit: REVIEW_LIMIT_PAGINATION,
      },
    };
  }
}
