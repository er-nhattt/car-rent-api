import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { I18nContext } from 'nestjs-i18n';
import { ApplicationError, ChildError } from '../error/app.error';

@Catch(ApplicationError)
export class ApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: ApplicationError, host: ArgumentsHost) {
    const i18n = I18nContext.current(host);
    const response = host.switchToHttp().getResponse<Response>();
    const errorKey = exception.mainErrorKey;
    const status = Number(i18n.t(`${errorKey}.http_code`));

    const errorResponse = {
      error: {
        error_id: `${errorKey.split('.')[1]}`,
        title: i18n.t(`${errorKey}.title`),
        message: `${i18n.t(`${errorKey}.inter`)} (${errorKey.split('.')[1]})`,
        errors: this.getChildErrors(exception.childErrors, i18n),
      },
    };

    response.status(status).json(errorResponse);
  }

  getChildErrors(childErrors: ChildError[], i18n: I18nContext) {
    if (childErrors && childErrors.length) {
      return childErrors.map((childError) => ({
        error_id: `${childError.key.split('.')[1]}`,
        field: childError.field,
        title: i18n.t(`${childError.key}.title`),
        message: `${i18n.t(`${childError.key}.inter`)} (${
          childError.key.split('.')[1]
        })`,
      }));
    }
    return [];
  }
}
