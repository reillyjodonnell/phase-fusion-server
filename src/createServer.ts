import { Server } from 'socket.io';
import { UserService } from './user/user-service';
import { UserRepository } from './user/user-repository';
import { UserEvents } from './user/user-events';
import { RedisClientType } from 'redis';

// generate new uuid
function randomId() {
  return crypto.randomUUID();
}

interface ServerToClientEvents {
  session: ({
    sessionID,
    userID,
    isNewUser,
  }: {
    sessionID: string;
    userID: string;
    isNewUser: boolean;
  }) => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  session: (
    callback: (data: {
      sessionID: string;
      userID: string;
      isNewUser: boolean;
    }) => void
  ) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  sessionID: string;
  userID: string;
  isNewUser: boolean;
}

export function createServer(db: RedisClientType) {
  const userRepository = new UserRepository(db);

  const userService = new UserService(userRepository);
  const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >({
    /* options */
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.sessionID;
    if (token) {
      // find existing session by id
      const found = await userService.getUser(token);
      if (found) {
        socket.data.sessionID = token;
        socket.data.userID = found.id;
        socket.data.isNewUser = false;
      }
      return next();
    }

    // it's a new user, let's create a new session
    // create new session
    socket.data.sessionID = randomId();
    socket.data.userID = randomId();
    socket.data.isNewUser = true;
    next();
  });

  io.on('connection', (socket) => {
    socket.emit('session', {
      sessionID: socket.data.sessionID,
      userID: socket.data.userID,
      isNewUser: socket.data.isNewUser,
    });
    socket.on('session', (callback) => {
      callback({
        sessionID: socket.data.sessionID,
        userID: socket.data.userID,
        isNewUser: socket.data.isNewUser,
      });
    });
    console.log('emitted session');
    const userEvents = new UserEvents(userService, socket);

    userEvents.listen();
  });
  io.on('disconnect', () => {});

  io.on('error', (err) => {});

  io.listen(3000);
  return io;
}
