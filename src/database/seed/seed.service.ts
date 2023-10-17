import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarTypeLanguage } from 'src/modules/car-types/entities/car-type-language.entity';
import { CarCarType } from 'src/modules/cars/entities/car-car-type.entity';
import { CarLanguage } from 'src/modules/cars/entities/car-language.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { Image } from 'src/modules/images/entities/image.entity';
import { Language } from 'src/modules/languages/entities/language.entity';
import { Repository } from 'typeorm';
import { carLanguages } from './data/car-languages.data';
import { carTypeLanguages } from './data/car-type-languages.data';
import { carCarTypes } from './data/car-car-types.data';
import { cars } from './data/cars.data';
import { images } from './data/images.data';
import { languages } from './data/languages.data';
import { CarType } from 'src/modules/car-types/entities/car-type.entity';
import { carTypes } from './data/car-type.data';
import { City } from 'src/modules/cites/entities/city.entity';
import { cities } from './data/cities.data';
import { CarCity } from 'src/modules/cars/entities/car-city.entity';
import { carCities } from './data/car-cities.data';
import { PaymentMethod } from 'src/modules/payment-methods/entities/payment-method.entity';
import { paymentMethods } from './data/payment-methods.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,

    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,

    @InjectRepository(Language)
    private languagesRepository: Repository<Language>,

    @InjectRepository(CarLanguage)
    private carLanguagesRepository: Repository<CarLanguage>,

    @InjectRepository(CarTypeLanguage)
    private carTypeLanguagesRepository: Repository<CarTypeLanguage>,

    @InjectRepository(CarCarType)
    private carCarTypesRepository: Repository<CarCarType>,

    @InjectRepository(CarType)
    private carTypesRepository: Repository<CarType>,

    @InjectRepository(City)
    private citiesRepository: Repository<City>,

    @InjectRepository(CarCity)
    private carCitiesRepository: Repository<CarCity>,

    @InjectRepository(PaymentMethod)
    private paymentMethodsRepository: Repository<PaymentMethod>,
  ) {}

  createCars(): Array<Promise<Car>> {
    return cars.map(async (car) => {
      return await this.carsRepository
        .findOne({ where: { thumbnailUrl: car.thumbnailUrl } })
        .then(async (dbCar) => {
          if (dbCar) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.carsRepository.save(car));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createImages(): Array<Promise<Image>> {
    return images.map(async (image) => {
      return await this.imagesRepository
        .findOne({
          where: {
            objectId: image.objectId,
            url: image.url,
            objectType: image.objectType,
          },
        })
        .then(async (dbImage) => {
          if (dbImage) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.imagesRepository.save(image));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createLanguages(): Array<Promise<Image>> {
    return languages.map(async (language) => {
      return await this.languagesRepository
        .findOne({
          where: {
            code: language.code,
          },
        })
        .then(async (dbLanguage) => {
          if (dbLanguage) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.languagesRepository.save(language));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createCarLanguages(): Array<Promise<CarLanguage>> {
    return carLanguages.map(async (carLanguage) => {
      return await this.carLanguagesRepository
        .findOne({
          where: {
            languageCode: carLanguage.languageCode,
            carId: carLanguage.carId,
          },
        })
        .then(async (dbCarLanguage) => {
          if (dbCarLanguage) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            await this.carLanguagesRepository.save(carLanguage),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createCarTypeLanguages(): Array<Promise<CarTypeLanguage>> {
    return carTypeLanguages.map(async (carTypeLanguage) => {
      return await this.carTypeLanguagesRepository
        .findOne({
          where: {
            languageCode: carTypeLanguage.languageCode,
            carTypeId: carTypeLanguage.carTypeId,
          },
        })
        .then(async (dbCarTypeLanguage) => {
          if (dbCarTypeLanguage) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            await this.carTypeLanguagesRepository.save(carTypeLanguage),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createCarCarType(): Array<Promise<CarCarType>> {
    return carCarTypes.map(async (carCarType) => {
      return await this.carCarTypesRepository
        .findOne({
          where: {
            carId: carCarType.carId,
            carTypeId: carCarType.carTypeId,
          },
        })
        .then(async (dbCarType) => {
          if (dbCarType) {
            return Promise.resolve(null);
          }
          return Promise.resolve(
            await this.carCarTypesRepository.save(carCarType),
          );
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createCarType(): Array<Promise<CarType>> {
    return carTypes.map(async (carType) => {
      return await this.carTypesRepository
        .findOne({
          where: {
            id: carType.id,
          },
        })
        .then(async (dbCarType) => {
          if (dbCarType) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.carTypesRepository.save(carType));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createCities(): Array<Promise<City>> {
    return cities.map(async (city) => {
      return await this.citiesRepository
        .findOne({
          where: { id: city.id },
        })
        .then(async (dbCity) => {
          if (dbCity) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.citiesRepository.save(city));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createCarCities(): Array<Promise<CarCity>> {
    return carCities.map(async (carCity) => {
      return await this.carCitiesRepository
        .findOne({
          where: { carId: carCity.carId, cityId: carCity.cityId },
        })
        .then(async (dbCarCity) => {
          if (dbCarCity) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.carCitiesRepository.save(carCity));
        })
        .catch((error) => Promise.reject(error));
    });
  }

  createPaymentMethods(): Array<Promise<PaymentMethod>> {
    return paymentMethods.map(async (paymentMethod) => {
      return await this.paymentMethodsRepository
        .findOne({
          where: {  },
        })
        .then(async (dbPaymentMethod) => {
          if (dbPaymentMethod) {
            return Promise.resolve(null);
          }
          return Promise.resolve(await this.paymentMethodsRepository.save(paymentMethod));
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
