import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from 'src/shared/logger/logger.service';


@Catch()
export class InternalExceptionFilter implements ExceptionFilter {
  constructor(private loggerService: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest();
    const response = host.switchToHttp().getResponse<Response>();
    const message = exception.message;
    const status = 500;
    const body = {
      error: {
        error_id: 'SYS-500',
        code: 'INTERNAL_SERVER_ERROR',
        title: `${message}`,
        message: `${message} (SYS-500)`,
      },
    };
    this.loggerService.logError(host, status, body, exception);

    response.status(status).json(body);
  }
}
