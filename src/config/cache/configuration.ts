import { registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
export default registerAs('cache', () => ({
  store: redisStore,
  host: process.env.REDIS_CACHE_HOST || 'localhost',
  port: process.env.REDIS_CACHE_PORT || 6379,
  prefix: process.env.REDIS_CACHE_PREFIX || 'cache:',
  ttl: process.env.REDIS_CACHE_TTL || 60,
  max: process.env.REDIS_CACHE_MAX || 100,
}));
