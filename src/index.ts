import { Server } from 'socket.io';
import { UserService } from './user/user-service';
import { UserRepository } from './user/user-repository';
import { UserEvents } from './user/user-events';
import { db } from './db';

const randomId = () => {
  return Math.floor(Math.random() * 1000);
};

const database = await db();

const userRepository = new UserRepository();

const userService = new UserService(userRepository);

export function createServer() {
  const io = new Server({
    /* options */
  });

  io.use((socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      socket.userID = sessionID;
      // find existing session by id
      return next();
    }

    // create new session
    socket.sessionID = randomId();
    socket.userID = randomId();
    next();
  });

  io.on('connection', (socket) => {
    socket.emit('session', {
      sessionID: socket.sessionID,
      userID: socket.userID,
    });
    const userEvents = new UserEvents(userService, socket);

    userEvents.attach(socket);
  });
  io.on('disconnect', () => {});

  io.on('error', (err) => {});

  io.listen(3000);
  return io;
}
