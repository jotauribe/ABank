export interface IClient {
  id: string;
  firstName: string;
  lastName: string;
}

export class Client implements IClient {
  id: string;
  firstName: string;
  lastName: string;
  birthdate: string;

  constructor(id, firstName, lastName, birthdate) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthdate = birthdate;
  }
}
