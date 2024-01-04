import { describe, it, expect } from 'bun:test';
import { LobbyRepository } from './lobby-repository';
import { Lobby } from './lobby';

describe('lobby repository', () => {
  it('should create new user', () => {
    let lobbyRepository = new LobbyRepository();
    let lobby = new Lobby('1', '1234');
    lobbyRepository.create(lobby);
    let createdLobby = lobbyRepository.get(lobby.getId());
    expect(createdLobby).toStrictEqual(lobby);
  });

  // ...
});
