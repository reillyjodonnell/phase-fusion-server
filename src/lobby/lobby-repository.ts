import { RedisClientType } from '@redis/client';
import { Lobby } from './lobby';

interface ILobbyRepository {
  create(id: string, lobby: Lobby): Promise<Lobby | null>;
  get(id: string): Promise<Lobby>;
}

export class LobbyRepository implements ILobbyRepository {
  private lobbyRepository: RedisClientType;

  constructor(lobbyRepository: RedisClientType) {
    this.lobbyRepository = lobbyRepository;
  }

  async set(id: string, lobby: Lobby) {
    const set = await this.lobbyRepository.hSet(id, lobby);
    // check the number to see if successful
    if (set === 0) {
      return null;
    }
    return lobby;
  }
  async get(id: string) {
    const res = await this.lobbyRepository.hGetAll(id);
    if (!res) {
      return null;
    }
    return res;
  }
}
