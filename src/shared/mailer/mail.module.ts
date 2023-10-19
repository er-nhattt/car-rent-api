import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { BullModule } from '@nestjs/bull';
import { MailProcessor } from './processors/mail.processor';
import { join } from 'path';
import { MailConfigModule } from 'src/config/mail/config.module';
import { MailConfigService } from 'src/config/mail/config.service';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [MailConfigModule],
      inject: [MailConfigService],
      useFactory: (mailConfig: MailConfigService) => ({
        transport: {
          host: mailConfig.host,
          port: mailConfig.port,
          secure: mailConfig.secure,
          auth: {
            user: mailConfig.user,
            pass: mailConfig.password,
          },
        },
        defaults: {
          from: `"${mailConfig.name}" <${mailConfig.user}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  providers: [MailProcessor, MailService, MailConfigService, ConfigService],
  exports: [MailService],
})
export class MailModule {}