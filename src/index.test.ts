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
    console.log('Running test');
    return new Promise((resolve) => {
      clientSocket.on('session', (session) => {
        console.log(session);
      });
      resolve();
    });
  });

  it('should allow users to create a user account', () => {
    const fakeUser = {
      id: USER_ID,
      name: 'John Doe',
      email: 'johndoe@gmail.com',
    };
    return new Promise((resolve) => {
      clientSocket.emit('createUser', fakeUser, (createdUser) => {
        expect(createdUser).toStrictEqual(fakeUser);
        resolve();
      });
    });
  });

  it('should allow users to edit their user account', () => {
    const fakeUser = {
      name: 'Jane Doe',
    };
    return new Promise((resolve) => {
      clientSocket.emit('editUser', fakeUser, (updatedUser) => {
        expect(updatedUser).toStrictEqual({
          ...fakeUser,
          email: 'johndoe@gmail.com',
          id: USER_ID,
        });
        resolve();
      });
    });
  });
});
