import { describe, it, expect } from 'bun:test';
import { Lobby } from './lobby';

describe('lobby application', () => {
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
