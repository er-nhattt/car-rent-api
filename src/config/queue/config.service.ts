import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QueueConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('mail.host');
  }

  get port(): number {
    return this.configService.get<number>('mail.port');
  }

  get prefix(): string {
    return this.configService.get<string>('mail.prefix');
  }

}
