import { describe, it, expect } from 'bun:test';
import { Lobby } from './lobby';

//What types of things would users of this class need?
//1. Joining lobbies
//2. Creating lobbies
//3. Leaving lobby
//4 .Managing lobby settings (i.e. kicking player, changing lobby name, etc.)
describe.only('lobby ', () => {
  it('should create a lobby', () => {
    const lobbyOne = new Lobby('1', 'ABC');
    expect(lobbyOne.getId()).toBe('1');
  });

  // join a lobby
  it('should join a lobby', () => {
    const existingLobby = new Lobby('2', 'ABC');
    existingLobby.join('1');
    expect(existingLobby.getNumberOfPlayers()).toBe(1);
  });

  // leave a lobby
  it('should leave a lobby', () => {
    const playerOneID = '1';
    const existingLobby = new Lobby('2', 'ABC');
    existingLobby.join(playerOneID);
    expect(existingLobby.getNumberOfPlayers()).toBe(1);
    existingLobby.leave(playerOneID);
    expect(existingLobby.getNumberOfPlayers()).toBe(0);
  });

  // manage lobby settings
  it(' should have configurable settings', () => {
    const lobbyOne = new Lobby('1', 'ABC');
    expect(lobbyOne.getMaxPlayers()).toBe(2);
    lobbyOne.setMaxPlayers(4);
    expect(lobbyOne.getMaxPlayers()).toBe(4);
  });

  it('should allow users to toggle their ready status', () => {
    const playerOneID = '1';
    const existingLobby = new Lobby('2', 'ABC');
    existingLobby.join(playerOneID);
    existingLobby.toggleReady(playerOneID);
    // that player should be ready

    expect(existingLobby.isPlayerReady(playerOneID)).toBe(true);
  });

  it('should allow users to kick other users if they are the host', () => {
    const playerOneID = '1';
    const playerTwoID = '2';
    const existingLobby = new Lobby('2', 'ABC');
    existingLobby.join(playerOneID);
    existingLobby.join(playerTwoID);
    existingLobby.kickPlayer(playerTwoID);
    expect(existingLobby.getNumberOfPlayers()).toBe(1);
  });
  it('should give the first player the role of host', () => {
    const playerOneID = '1';
    const playerTwoID = '2';
    const playerThreeID = '3';

    const existingLobby = new Lobby('2', 'ABC');
    existingLobby.join(playerOneID);
    existingLobby.join(playerTwoID);
    existingLobby.join(playerThreeID);
    expect(existingLobby.isPlayerHost(playerOneID)).toBe(true);
  });

  it('should allow host to make another player host', () => {
    const playerOneID = '1';
    const playerTwoID = '2';
    const playerThreeID = '3';

    const existingLobby = new Lobby('2', 'ABC');
    existingLobby.join(playerOneID);
    existingLobby.join(playerTwoID);
    existingLobby.join(playerThreeID);
    expect(existingLobby.isPlayerHost(playerOneID)).toBe(true);
    existingLobby.makeHost(playerTwoID);
    expect(existingLobby.isPlayerHost(playerOneID)).toBe(false);
    expect(existingLobby.isPlayerHost(playerTwoID)).toBe(true);
  });
});
