import { User, UserRepository } from './user-repository';

export class UserService {
  constructor(private userRepository: UserRepository) {}
  createUser(user: User) {
    return this.userRepository.create(user);
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
