import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { I18nContext, I18nValidationException } from 'nestjs-i18n';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(I18nValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor() {}

  catch(exception: I18nValidationException, host: ArgumentsHost) {
    const i18n = I18nContext.current(host);
    const response = host.switchToHttp().getResponse<Response>();
    const status = Number(exception.getStatus());
    const errors = exception.errors;
    const errorKey = 'system.CUS-0603';
    const body = {
      error: {
        error_id: `${errorKey.split('.')[1]}`,
        code: i18n.t(`${errorKey}.app_code`),
        title: i18n.t(`${errorKey}.title`),
        message: `${i18n.t(`${errorKey}.prod`)} (${errorKey.split('.')[1]})`,
        errors: this.getChildErrors(errors, i18n),
      },
    };

    response.status(status).json(body);
  }

  getChildErrors(validationErrors: ValidationError[], i18n: I18nContext) {
    const result = [];

    if (validationErrors) {
      for (const error of validationErrors) {
        for (const key in error.constraints) {
          result.push({
            error_id: `${error.constraints[key].split('.')[1]}`,
            field: error.property,
            title: i18n.t(`${error.constraints[key]}.title`),
            message: `${i18n.t(`${error.constraints[key]}.prod`)} (${
              error.constraints[key].split('.')[1]
            })`,
          });
        }
        if (error.children && error.children.length) {
          result.push(...this.getChildErrors(error.children, i18n));
        }
      }
    }

    return result;
  }
}
