import { describe, it, expect, afterAll } from 'bun:test';
import { UserRepository } from './user-repository';
import { User } from './user';
import { RedisClientType, createClient } from 'redis';

describe('user creation', async () => {
  const client = createClient();
  await client.connect();
  afterAll(async () => {
    await client.disconnect();
  });
  // create redis instance
  it('should create and get new user', async () => {
    let userRepository = new UserRepository(client as RedisClientType);
    let user = new User('1', 'John');
    await userRepository.create(user);

    let createdUser = await userRepository.get(user.id);
    expect(createdUser).toStrictEqual(user);
  });

  it('should edit existing user', async () => {
    let userRepository = new UserRepository(client as RedisClientType);
    let user = new User('1', 'John');
    await userRepository.create(user);
    await userRepository.edit(user.id, { name: 'Jane' });
    const editedUser = await userRepository.get(user.id);
    expect(editedUser.getName()).toStrictEqual('Jane');
  });
  // ...
});
