import { describe, it, expect } from 'bun:test';
import { UserRepository } from './user-repository';
import { User } from './user';

describe('user creation', () => {
  it('should create new user', () => {
    let userRepository = new UserRepository();
    let user = new User('John', '1234');
    userRepository.create(user);

    let createdUser = userRepository.get(user.id);
    expect(createdUser).toStrictEqual(user);
  });

  it('should edit existing user', () => {
    let userRepository = new UserRepository();
    let user = new User('John', '1234');
    userRepository.create(user);
    userRepository.edit(user.id, { name: 'Jane' });
    expect(userRepository.get(user.id).name).toStrictEqual('Jane');
  });
  // ...
});
