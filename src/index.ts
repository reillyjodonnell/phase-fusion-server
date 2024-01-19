import { RedisClientType } from 'redis';
import { createServer } from './createServer';
import { db } from './db';

const database = await db();
createServer(database as RedisClientType);
