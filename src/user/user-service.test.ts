import { afterAll, describe, expect, it } from 'bun:test';
import { UserService } from './user-service';
import { UserRepository } from './user-repository';
import { createClient } from 'redis';

describe('user service', async () => {
  const client = createClient();
  await client.connect();
  afterAll(async () => {
    await client.disconnect();
  });
  const userRepository = new UserRepository(client);
  it('should create new user', async () => {
    const userService = new UserService(userRepository);

    userService.createUser({
      id: '0',
      name: 'John Doe',
    });
    const user = await userService.getUser('0');

    expect(user.getId()).toBe('0');
    expect(user.getName()).toBe('John Doe');
  });
  it('should edit existing user', async () => {
    const userService = new UserService(userRepository);
    userService.createUser({
      id: '0',
      name: 'John Doe',
    });
    userService.editUser('0', { name: 'Jane Doe' });
    const user = await userService.getUser('0');

    expect(user.getName()).toBe('Jane Doe');
  });
  it('should fail when editing non existing user', async () => {
    const userService = new UserService(userRepository);
    userService.createUser({
      id: '0',
      name: 'John Doe',
    });

    expect(await userService.editUser('1', { name: 'Jane Doe' })).toStrictEqual(
      'User does not exist'
    );
  });
  // ...
});
