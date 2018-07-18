import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { Client } from '../models/client.model';
import { Employment } from '../models/employment.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  fetchClient(id: number): Observable<Client> {
    const queryUrl = `http://localhost:3000/clients/${id}`;

    return this.http.get<Client>(queryUrl);
  }

  registerClient(client: Client): Observable<Client> {
    const queryUrl = 'http://localhost:3000/clients/';

    return this.http.post<Client>(queryUrl, client);
  }

  saveClientEmploymentInfo(employment: Employment): Observable<Employment> {
    const queryUrl = `http://localhost:3000/clients/${
      employment.clientId
    }/employments/`;

    return this.http.post<Employment>(queryUrl, employment);
  }
}
