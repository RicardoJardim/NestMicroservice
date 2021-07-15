import { Injectable, NotFoundException } from '@nestjs/common';
import { TokenGenerator } from 'src/generator/token_generator';
import { Auth } from './auth.model';
import { MESSAGES } from 'src/constants/constants';
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
      return new NotFoundException(MESSAGES.NOT_LOGIN);
    }

    const key = TokenGenerator.getInstance().generateKey();
    this.users[user[1]].key = key;
    return this.users[user[1]].returnObject();
  }

  async logoff(key: string): Promise<{} | NotFoundException> {
    const user: [Auth, number] = this.findUser(key);

    if (!user[0]) {
      return new NotFoundException(MESSAGES.NOT_LOGIN);
    }
    this.users[user[1]].key = '';

    const obj = {
      success: true,
    };
    return { ...obj };
  }

  async register(username: string, password: string): Promise<{}> {
    const key = TokenGenerator.getInstance().generateKey();
    const newUser = new Auth(username, password, key);
    this.users.push(newUser);
    return newUser.returnObject();
  }

  async deleteUser(key: string): Promise<{} | NotFoundException> {
    const user: [Auth, number] = this.findUser(key);

    if (!user[0]) {
      return new NotFoundException(MESSAGES.NOT_LOGIN);
    }
    this.users.splice(user[1], 1);

    const obj = {
      success: true,
      message: MESSAGES.DELETED,
    };
    return { ...obj };
  }

  private findUser(key: string): [Auth, number] {
    let userIndex = this.users.findIndex((el) => el.key == key);
    if (userIndex == -1) {
      return [null, null];
    }
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
