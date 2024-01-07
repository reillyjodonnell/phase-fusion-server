type UserDTO = {
  id: string;
  name: string;
};

export class User {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  setName(name: string) {
    this.name = name;
  }

  toDTO(): UserDTO {
    return {
      id: this.id,
      name: this.name,
    };
  }

  static fromDTO(dto: UserDTO) {
    return new User(dto.id, dto.name);
  }
}
export type UserArgs = typeof User;
