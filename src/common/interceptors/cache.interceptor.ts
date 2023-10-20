import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const request = context.switchToHttp().getRequest();
    const userId = request?.user?.id || '';
    const endpointURL = request.url;

    return userId ? `/${userId}${endpointURL}` : endpointURL;
  }
}
