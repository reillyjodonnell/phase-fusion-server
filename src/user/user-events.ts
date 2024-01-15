import { Socket } from 'socket.io';
import { UserService } from './user-service';
import { User } from './user';

// UserEvents.ts
export class UserEvents {
  socket: Socket;
  userService: UserService;
  constructor(userService: UserService, socket: Socket) {
    this.socket = socket;
    this.userService = userService;
  }

  listen() {
    this.socket.on('createUser', async (user: typeof User, callback) => {
      const res = await this.userService.createUser(user);
      callback(res);
    });
    this.socket.on('editUser', (user, callback) => {
      const res = this.userService.editUser(this.socket.userID, user);
      callback(res);
    });
  }
}
