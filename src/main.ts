import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module';
import { ApplicationExceptionFilter } from './common/exceptions/application-exception.filter';
import { ValidationExceptionFilter } from './common/exceptions/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new ApplicationExceptionFilter());
  app.useGlobalFilters(new ValidationExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle('Car rent')
    .setDescription('The car rent API description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'accessToken',
    )
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
