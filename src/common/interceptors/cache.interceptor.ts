import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const userId = request?.user?.id || '';
    const endpointURL = request.url;
    const language = request.headers['accept-language'] || 'en';

    return userId
      ? `/${userId}/${language}${endpointURL}`
      : `/${language}${endpointURL}`;
  }
}
