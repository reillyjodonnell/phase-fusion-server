import { Socket } from 'socket.io';
import { UserService } from './user-service';
import { User } from './user';

// UserEvents.ts
export class UserEvents {
  constructor(private userService: UserService, private socket: Socket) {}

  attach(socket: Socket) {
    this.socket.on('createUser', (user: typeof User, callback) => {
      const res = this.userService.createUser(user);
      callback(res);
    });
    this.socket.on('editUser', (user, callback) => {
      const res = this.userService.editUser(this.socket.userID, user);
      callback(res);
    });
  }
}
