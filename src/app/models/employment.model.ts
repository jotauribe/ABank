import { Company } from './company.model';
import { Client } from './client.model';

export interface IEmployment {
  client: Client;
  company: Company;
  salary: number;
  hireDate: string;
}

export class Employment implements IEmployment {
  client: Client;
  company: Company;
  salary: number;
  hireDate: string;

  constructor(client, company, salary, hireDate) {
    this.client = client;
    this.company = company;
    this.salary = salary;
    this.hireDate = hireDate;
  }
}
