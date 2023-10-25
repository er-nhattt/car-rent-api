import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
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
import {
  AcceptLanguageResolver,
  CookieResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { MysqlConfigModule } from './config/database/mysql/config.module';
import { CacheConfigService } from './config/cache/config.service';
import { CacheConfigModule } from './config/cache/config.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from './shared/logger/logger.module';
import { MailModule } from './shared/mailer/mail.module';
import { QueueConfigModule } from './config/queue/config.module';
import { QueueConfigService } from './config/queue/config.service';
import { BullModule } from '@nestjs/bull';
import { join } from 'path';
@Module({
  imports: [
    MysqlConfigModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    I18nModule.forRootAsync({
      useFactory: () => ({
        fallbackLanguage: 'en',
        loaderOptions: {
          path: join(__dirname, '/i18n/'),
          watch: true,
        },
        typesOutputPath: join(__dirname, './i18n/types/i18n.generated.ts'),
      }),

      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    BullModule.forRootAsync({
      imports: [QueueConfigModule],
      inject: [QueueConfigService],
      useFactory: async (queueConfig: QueueConfigService) => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
        prefix: queueConfig.prefix,
      }),
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),
    CacheModule.registerAsync({
      imports: [CacheConfigModule],
      inject: [CacheConfigService],
      isGlobal: true,
      useFactory: (cacheConfig: CacheConfigService) => ({
        ttl: cacheConfig.ttl,
        max: cacheConfig.max,
        store: redisStore,
        host: cacheConfig.host,
        port: cacheConfig.port,
        prefix: cacheConfig.prefix,
      }),
    }),
    LoggerModule.register({
      logLevel: 'info',
      requestFileName: 'logs/request/%DATE%.log',
      responseFileName: 'logs/response/%DATE%.log',
      errorFileName: 'logs/error/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: 1000000,
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
    MailModule,
  ],
})
export class AppModule {}
