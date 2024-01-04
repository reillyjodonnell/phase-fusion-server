import { createClient } from 'redis';

export async function db() {
  const redis = createClient();
  redis.on('error', (err) => console.log('Redis Client Error', err));
  await redis.connect();
  return redis;
}
