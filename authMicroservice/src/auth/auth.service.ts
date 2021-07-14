import { Injectable, NotFoundException } from '@nestjs/common';
import { Auth } from './auth.model';
@Injectable()
export class AuthService {
  private users: Auth[] = [];

  async verifyAuth(key: string): Promise<true | false> {
    let user = this.findUser(key)[0];
    if (!user) {
      return false;
    }

    return true;
  }

  async getUser(key: string): Promise<{} | NotFoundException> {
    let user = this.findUser(key)[0];
    if (!user) {
      return new NotFoundException();
    }

    return { ...user.returnObject() };
  }

  async login(username: string, password: string): Promise<{}> {
    const user: [Auth, number] = this.findUserByUP(username, password);

    if (!user[0]) {
      return new NotFoundException('User is not logging yet.');
    }

    const key = `RandomKey${Math.floor(Math.random() * 200) + 50}Ola`;
    this.users[user[1]].key = key;
    return this.users[user[1]].returnObject();
  }

  async logoff(key: string): Promise<{} | NotFoundException> {
    const user: [Auth, number] = this.findUser(key);

    if (!user[0]) {
      return new NotFoundException('User is not logging yet.');
    }
    this.users[user[1]].key = '';

    const obj = {
      success: true,
    };
    return { ...obj };
  }

  async register(username: string, password: string): Promise<{}> {
    const key = `RandomKey${Math.floor(Math.random() * 200) + 50}Ola`;
    const newUser = new Auth(username, password, key);
    this.users.push(newUser);
    return newUser.returnObject();
  }

  async deleteUser(key: string): Promise<{} | NotFoundException> {
    const user: [Auth, number] = this.findUser(key);

    if (!user[0]) {
      return new NotFoundException('User is not logging yet.');
    }
    this.users.splice(user[1], 1);

    const obj = {
      success: true,
      message: 'User was deleted successfully',
    };
    return { ...obj };
  }

  private findUser(key: string): [Auth, number] {
    let userIndex = this.users.findIndex((el) => el.key == key);
    let user = this.users[userIndex];
    return [user, userIndex];
  }

  private findUserByUP(username: string, password: string): [Auth, number] {
    let userIndex = this.users.findIndex(
      (el) => el.username == username && el.password == password,
    );
    let user = this.users[userIndex];
    return [user, userIndex];
  }
}
