import { RedisClientType } from 'redis';
import { User } from './user';

export class UserRepository {
  private users: { [id: string]: User };
  private redis: RedisClientType;

  constructor(redis: RedisClientType) {
    this.redis = redis;
    this.users = {};
  }
  async create(user: User) {
    const dto = user.toDTO();
    const status = await this.redis.set(user.getId(), JSON.stringify(dto));
    if (status) {
      return user;
    }
    throw new Error('User not created');
  }
  async get(id: string) {
    const user = await this.redis.get(id);
    if (user) {
      return User.fromDTO(JSON.parse(user));
    }
    throw new Error('User not found');
  }
  async edit(id: string, newData: Partial<User>) {
    const user = await this.redis.get(id);
    if (user) {
      const parsedUser = JSON.parse(user);
      const dto = { ...parsedUser, ...newData };
      return this.redis.set(id, JSON.stringify(dto));
    }
    throw new Error('User not found');
  }

  // GET ALL ENTRIES
  getAll() {
    return Object.values(this.users);
  }
}
