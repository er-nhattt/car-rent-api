import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Token } from 'src/modules/auth/entities/token.entity';
import { CarTypeLanguage } from 'src/modules/car-types/entities/car-type-language.entity';
import { CarType } from 'src/modules/car-types/entities/car-type.entity';
import { CarCarType } from 'src/modules/cars/entities/car-car-type.entity';
import { CarCity } from 'src/modules/cars/entities/car-city.entity';
import { CarLanguage } from 'src/modules/cars/entities/car-language.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { City } from 'src/modules/cites/entities/city.entity';
import { Favourite } from 'src/modules/favourites/entities/favourite.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { Language } from 'src/modules/languages/entities/language.entity';
import { OrderDetail } from 'src/modules/orders/entities/order-detail.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { PaymentMethod } from 'src/modules/payment-methods/entities/payment-method.entity';
import { Promo } from 'src/modules/promos/entities/promo.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import { User } from 'src/modules/users/entities/user.entity';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService): Promise<any> => {
    return {
      type: process.env.MYSQL_TYPE,
      host: process.env.MYSQL_HOST || 'localhost',
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      username: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || '' as string,
      database: process.env.MYSQL_DATABASE,
      synchronize: process.env.MYSQL_SYNCHRONIZE === 'true',
      entities: [
        Token,
        CarType,
        CarTypeLanguage,
        CarCarType,
        CarCity,
        CarLanguage,
        Car,
        City,
        Favourite,
        Image,
        Language,
        Order,
        OrderDetail,
        PaymentMethod,
        Promo,
        Review,
        User,
      ],
    };
  },
};
