import { Injectable } from '@nestjs/common';
import { SeedService } from './seed.service';

@Injectable()
export class Seeder {
  constructor(private readonly seedService: SeedService) {}

  async seed() {
    await this.promo()
      .then((completed) => {
        console.log('Successfully completed seeding');
        Promise.resolve(completed);
      })
      .catch((error) => {
        console.log('Failed seeding');
        Promise.reject(error);
      });
  }

  async users() {
    return await Promise.all(this.seedService.createCars())
      .then(() => {
        console.log('Creating cars ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async images() {
    return await Promise.all(this.seedService.createImages())
      .then(() => {
        console.log('Creating images ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async languages() {
    return await Promise.all(this.seedService.createLanguages())
      .then(() => {
        console.log('Creating languages ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async carLanguages() {
    return await Promise.all(this.seedService.createCarLanguages())
      .then(() => {
        console.log('Creating car-type-languages ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async carTypeLanguages() {
    return await Promise.all(this.seedService.createCarTypeLanguages())
      .then(() => {
        console.log('Creating car-type-languages ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async carCarType() {
    return await Promise.all(this.seedService.createCarCarType())
      .then(() => {
        console.log('Creating car-car-type ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async carType() {
    return await Promise.all(this.seedService.createCarType())
      .then(() => {
        console.log('Creating car-type ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async city() {
    return await Promise.all(this.seedService.createCities())
      .then(() => {
        console.log('Creating city ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async carCity() {
    return await Promise.all(this.seedService.createCarCities())
      .then(() => {
        console.log('Creating car city ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async paymentMethod() {
    return await Promise.all(this.seedService.createPaymentMethods())
      .then(() => {
        console.log('Creating payment methods ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }

  async promo() {
    return await Promise.all(this.seedService.createPromos())
      .then(() => {
        console.log('Creating promo code ...');
        return Promise.resolve(true);
      })
      .catch((error) => Promise.reject(error));
  }
}
