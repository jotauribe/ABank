export interface ICompany {
  nit: string;
  name: string;
}

export class Company {
  nit: string;
  name: string;

  constructor(nit, name) {
    this.nit = nit;
    this.name = name;
  }
}
