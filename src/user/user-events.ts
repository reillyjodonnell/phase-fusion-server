import { Socket } from 'socket.io';
import { UserService } from './user-service';
import { User } from './user-repository';

// UserEvents.ts
export class UserEvents {
  constructor(private userService: UserService, private socket: Socket) {}

  attach(socket: Socket) {
    this.socket.on('createUser', (user, callback) =>
      this.handleCreateUser(user, callback)
    );
    this.socket.on('editUser', (user, callback) =>
      this.handleEditUser(this.socket.userID, user, callback)
    );
  }

  handleCreateUser(user: User, callback: Function) {
    const res = this.userService.createUser(user);
    callback(res);
  }

  handleEditUser(userID: string, user: User, callback: Function) {
    // Handle user editing
    const res = this.userService.editUser(userID, user);
    callback(res);
  }
}
