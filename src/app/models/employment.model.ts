import { ICompany } from './company.model';
import { Client } from './client.model';

export interface IEmployment {
  clientId: number;
  company: ICompany;
  salary: number;
  hireDate: string;
}

export class Employment implements IEmployment {
  clientId: number;
  company: ICompany;
  salary: number;
  hireDate: string;

  constructor(clientId, company, salary, hireDate) {
    this.clientId = clientId;
    this.company = company;
    this.salary = salary;
    this.hireDate = hireDate;
  }
}
