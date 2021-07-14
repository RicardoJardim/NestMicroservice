export class Auth {
  username: string;
  password: string;
  key: string;

  constructor(username: string, password: string, key: string) {
    this.username = username;
    this.password = password;
    this.key = key;
  }

  returnObject(): {} {
    return {
      username: this.username,
      key: 'Bearer ' + this.key,
    };
  }
}
