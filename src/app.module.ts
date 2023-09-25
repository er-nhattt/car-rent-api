import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';
import { ImagesModule } from './modules/images/images.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarTypesModule } from './modules/car-types/car-types.module';
import { CitiesModule } from './modules/cites/cities.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentMethodsModule } from './modules/payment-methods/payment-methods.module';
import { PromosModule } from './modules/promos/promos.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    CarsModule,
    ImagesModule,
    UsersModule,
    AuthModule,
    CarTypesModule,
    CitiesModule,
    FavouritesModule,
    OrdersModule,
    PaymentMethodsModule,
    PromosModule,
    ReviewsModule,
  ],
})
export class AppModule {}
