import { beforeAll, afterAll, describe, it, expect } from 'bun:test';
import { io as ioc, type Socket as ClientSocket } from 'socket.io-client';
import { Server, type Socket as ServerSocket } from 'socket.io';
import { createServer } from '.';

const USER_ID = '2';

describe('user creation', () => {
  let io: Server;
  let clientSocket: ClientSocket;

  beforeAll((done) => {
    // Start the server asynchronously
    io = createServer();

    // Initialize client socket
    clientSocket = ioc('http://localhost:3000', {
      auth: {
        sessionID: USER_ID,
      },
    });
    clientSocket.on('connect', () => {
      done();
    });
  });

  afterAll(() => {
    // Close the server and disconnect the client
    io.close();
    clientSocket.disconnect();
  });

  it('should tell me if Im a new user', () => {
    return new Promise((resolve) => {
      clientSocket.emit('session', (session) => {
        expect(session.isNewUser).toBe(true);
        resolve();
      });
    });
  });
  it('should tell me if Im an existing user', () => {
    return new Promise((resolve) => {
      const fakeUser = {
        id: USER_ID,
        name: 'John Doe',
      };
      clientSocket.emit('createUser', fakeUser, (createdUser) => {
        console.log(createdUser);
      });
      clientSocket.emit('session', (session) => {
        console.log(session);
        expect(session.isNewUser).toBe(false);
        resolve();
      });
    });
  });
});
