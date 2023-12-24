export class User {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

export class UserRepository {
  private users: { [id: string]: User };
  constructor() {
    this.users = {};
  }
  create(user: User) {
    this.users[user.id] = user;
    return user;
  }
  get(id: string) {
    return this.users[id];
  }
  edit(id: string, newData: Partial<User>) {
    const user = this.users[id];
    if (!user) {
      return { error: 'User does not exist' };
      // Or return null/undefined if you prefer
    }

    // Update user properties
    for (const key in newData) {
      // make sure the key is valid and type of User
      // @ts-ignore
      if (newData[key] !== undefined) {
        // @ts-ignore
        user[key] = newData[key];
      }
    }

    // Optionally return the updated user
    return user;
  }

  // GET ALL ENTRIES
  getAll() {
    return Object.values(this.users);
  }
}
