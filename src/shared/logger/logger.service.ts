import * as _ from 'lodash';
import {
  ArgumentsHost,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerType, SENSITIVE_FIELD } from 'src/common/constants';

@Injectable()
export class LoggerService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger,
  ) {}

  maskData(data: any) {
    if (_.isEmpty(data) || !_.isObject(data)) {
      return data;
    }
    const cloneData = _.cloneDeep(data);

    _.forEach(SENSITIVE_FIELD, (item) => {
      if (_.hasIn(cloneData, item)) {
        _.set(cloneData, item, '[MASKED]');
      }
    });

    return cloneData;
  }

  logRequest(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const cloneRequest = this.maskData(request);

      this.logger.log(LoggerType.REQUEST, {
        id: request.id,
        method: request.method,
        url: request.originalUrl,
        userId: request?.user?.id?.toString(),
        headers: cloneRequest.headers,
        body: cloneRequest.body,
      });
    } catch (error) {}
  }

  logResponse(context: ExecutionContext, httpStatus: number, body: object) {
    try {
      const request = context.switchToHttp().getRequest();
      const cloneRequest = this.maskData(request);

      this.logger.log(LoggerType.RESPONSE, {
        id: cloneRequest.id,
        method: cloneRequest.method,
        url: cloneRequest.originalUrl,
        userId: cloneRequest?.user?.id,
        status: httpStatus,
        headers: cloneRequest.headers,
        body: cloneRequest?.body,
      });
    } catch (error) {}
  }

  logError(
    context: ArgumentsHost,
    status: number,
    body: object,
    exception: Error,
  ) {
    try {
      const request = context.switchToHttp().getRequest();
      const cloneRequest = this.maskData(request);

      this.logger.error(LoggerType.ERROR, {
        id: request.id,
        method: request.method,
        url: request.originalUrl,
        userId: request?.user?.id?.toString(),
        status,
        headers: cloneRequest.headers,
        body,
        exception,
      });
    } catch (error) {}
  }
}
