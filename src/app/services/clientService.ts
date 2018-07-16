import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { map, catchError } from 'rxjs/operators';

import { Client } from '../models/client.model';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class ClientService {
  constructor(private http: HttpClient) {}

  fetchClient(id: number): Observable<Client> {
    const queryUrl = `http://localhost:3000/clients/${id}`;

    console.log('CALL TO CLIENT SERVICE::FETCHCLIENT', id);

    return this.http.get<Client>(queryUrl);
  }

  registerClient(client: Client): Observable<Client> {
    console.log('FROM REGISTERCLIENT SERVICE', client);
    const queryUrl = 'http://localhost:3000/clients/';

    return this.http.post<Client>(queryUrl, client);
  }
}
