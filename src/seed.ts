import { NestFactory } from '@nestjs/core';
import { Seeder } from './database/seed/seeder';
import { SeederModule } from './database/seed/seeder.module';
async function bootstrap() {
  const app = await NestFactory.create(SeederModule);

  try {
    const seeder = app.get(Seeder);
    await seeder.seed();
    console.log('Seeding complete!');
  } catch (error) {
    console.log('Seeding failed!');
    throw error;
  } finally {
    app.close();
  }
}
bootstrap();
