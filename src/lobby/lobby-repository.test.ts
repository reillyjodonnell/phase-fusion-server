import { describe, it, expect, afterAll } from 'bun:test';
import { LobbyRepository } from './lobby-repository';
import { Lobby } from './lobby';
import { createClient } from 'redis';

describe('lobby repository', async () => {
  const client = createClient();
  await client.connect();
  afterAll(async () => {
    await client.disconnect();
  });
  it('should create new user', async () => {
    let lobbyRepository = new LobbyRepository(client);
    let lobby = new Lobby('1', '1234');
    lobbyRepository.create(lobby);
    let createdLobby = await lobbyRepository.get(lobby.getId());
    expect(createdLobby.getRoomCode()).toStrictEqual(lobby.getRoomCode());
  });

  // ...
});
