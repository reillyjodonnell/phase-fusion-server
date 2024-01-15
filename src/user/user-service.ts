import { User } from './user';
import { UserRepository } from './user-repository';

type UserArgs = {
  id: string;
  name: string;
};
export class UserService {
  constructor(private userRepository: UserRepository) {}
  async createUser(user: UserArgs) {
    const newUser = new User(user.id, user.name);
    return await this.userRepository.create(newUser);
  }
  getUser(id: string) {
    return this.userRepository.get(id);
  }
  editUser(id: string, newData: Partial<User>) {
    return this.userRepository.edit(id, newData);
  }
  getAllUsers() {
    return this.userRepository.getAll();
  }
}
