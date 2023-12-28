import { describe, it, expect } from 'bun:test';
import { User } from './user';

describe('user', () => {
  it('should create a user', () => {
    const user = new User('1', 'ABC');
    expect(user.getId()).toBe('1');
  });
  it('should allow user to change name', () => {
    const user = new User('1', 'ABC');
    user.setName('DEF');
    expect(user.getName()).toBe('DEF');
  });
});
