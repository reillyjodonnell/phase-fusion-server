import { RedisClientType } from '@redis/client';
import { Lobby } from './lobby';

export class LobbyRepository {
  private lobbyRepository: RedisClientType;

  constructor(lobbyRepository: RedisClientType) {
    this.lobbyRepository = lobbyRepository;
  }

  async create(lobby: Lobby) {
    await this.lobbyRepository.set(
      lobby.getId(),
      JSON.stringify(lobby.toDTO())
    );
  }
  async get(id: string) {
    const lobby = await this.lobbyRepository.get(id);
    if (lobby) {
      return Lobby.fromDTO(JSON.parse(lobby));
    }
    throw new Error('Lobby not found');
  }
}
