import { describe, it, expect, beforeAll, afterAll, spyOn } from 'bun:test';
import { UserEvents } from './user-events';
import { io as ioc } from 'socket.io-client';
import { Server } from 'socket.io';
import { UserService } from './user-service';
import { UserRepository } from './user-repository';
import { createServer } from 'node:http';
import { type AddressInfo } from 'node:net';

describe('UserEvents', () => {
  let io: Server;
  let clientSocket: Socket;
  let serverSocket: Socket;
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = (httpServer.address() as AddressInfo).port;
      clientSocket = ioc(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.disconnect();
  });

  it.only('should handle createUser event when listening for events', () => {
    const userEvents = new UserEvents(userService, serverSocket);

    userEvents.attach(serverSocket);

    const spy = spyOn(userService, 'createUser');

    const userData = {
      id: '1',
      name: 'John Doe',
    };
    expect(spy).toHaveBeenCalledTimes(0);
    return new Promise((resolve) => {
      clientSocket.emit('createUser', userData, () => {
        expect(spy).toHaveBeenCalledTimes(1);
        resolve();
      });
    });
  });
});
