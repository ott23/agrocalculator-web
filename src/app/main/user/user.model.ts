export class User {
  id: number;
  username: string;
  password: string;
  role: string;

  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
