import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as moment from "moment";
import { AppModule } from './app.module';
import { ApplicationExceptionFilter } from './common/exceptions/application-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ApplicationExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Car rent')
    .setDescription('The car rent API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
  });
  await app.listen(3000);
}
bootstrap();
