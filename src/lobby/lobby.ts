export type LobbyDTO = {
  id: string;
  roomCode: string;
  maxPlayers: number;
  private: boolean;
  players: Map<String, { isReady: boolean; isHost: boolean }>;
};
export class Lobby {
  private id: string;
  private roomCode: string;
  private maxPlayers = 2;
  private private = true;
  private players: Map<String, { isReady: boolean; isHost: boolean }> =
    new Map();

  constructor(
    id: string,
    roomCode: string,
    maxPlayers = 2,
    privateLobby = true,
    players = new Map()
  ) {
    this.id = id;
    this.roomCode = roomCode;
    this.maxPlayers = maxPlayers;
    this.private = privateLobby;
    this.players = players;
  }

  getId() {
    return this.id;
  }

  getRoomCode() {
    return this.roomCode;
  }

  getMaxPlayers() {
    return this.maxPlayers;
  }
  getPlayers() {
    return this.players;
  }
  getNumberOfPlayers() {
    return this.players.size;
  }

  setMaxPlayers(maxPlayers: number) {
    this.maxPlayers = maxPlayers;
  }

  toDTO(): LobbyDTO {
    return {
      id: this.id,
      roomCode: this.roomCode,
      maxPlayers: this.maxPlayers,
      private: this.private,
      players: this.players,
    };
  }
  static fromDTO(dto: LobbyDTO) {
    // should pass in all options for lobbydto
    return new Lobby(
      dto.id,
      dto.roomCode,
      dto.maxPlayers,
      dto.private,
      dto.players
    );
  }

  join(id: string) {
    if (this.players.size >= this.maxPlayers) {
      return false;
    }
    this.players.set(id, { isReady: false, isHost: this.players.size === 0 });
    return true;
  }
  leave(id: string) {
    this.players.delete(id);
  }
  toggleReady(id: string) {
    if (!this.players.has(id)) return;
    const player = this.players.get(id);
    if (!player) return;
    player.isReady = !player.isReady;
  }
  isPlayerReady(id: string) {
    if (!this.players.has(id)) return false;
    const player = this.players.get(id);
    if (!player) return false;
    return player.isReady;
  }
  kickPlayer(id: string) {
    this.players.delete(id);
  }
  isPlayerHost(id: string) {
    // get that entry in the map
    const player = this.players.get(id);
    // check if the host is true
    if (!player) return false;
    return player.isHost;
  }
  makeHost(id: string) {
    // find the existing host by searching for entry where isHost is true
    this.players.forEach((player) => {
      if (player.isHost === true) {
        player.isHost = false;
      }
    });

    const player = this.players.get(id);
    if (!player) {
      throw new Error('Player does not exist!');
    }
    this.players.delete(id);
    this.players.set(id, { ...player, isHost: true });
  }
}
