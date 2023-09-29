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
import { typeOrmAsyncConfig } from './config/database/mysql/typeorm.config';
import { AcceptLanguageResolver, I18nModule, QueryResolver } from 'nestjs-i18n';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: 'src/i18n/',
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
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
