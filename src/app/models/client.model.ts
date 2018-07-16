export interface IClient {
  id: string;
  firstName: string;
  lastName: string;
}

export class Client {
  id: string;
  firstName: string;
  lastName: string;

  constructor(id, firstName, lastName) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
