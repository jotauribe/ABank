import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as SignUpActions from './actions';
import { ClientService } from '../../services/clientService';

@Injectable()
export class SignUpEffects {
  constructor(
    private actions$: Actions,
    private clientService: ClientService
  ) {}

  @Effect()
  fetchClient$: Observable<Action> = this.actions$.pipe(
    ofType(SignUpActions.SEARCH_CLIENT),
    switchMap((action: SignUpActions.SearchClient) =>
      this.clientService.fetchClient(action.payload).pipe(
        // If successful, dispatch success action with result
        map(data => {
          return new SignUpActions.SearchClientDone(data);
        }),
        // If request fails, dispatch failed action
        catchError(error => of(new SignUpActions.SearchClientFailed(error)))
      )
    )
  );

  @Effect()
  registerClient$: Observable<Action> = this.actions$.pipe(
    ofType(SignUpActions.REGISTER_CLIENT),
    switchMap((action: SignUpActions.RegisterClient) => {
      return this.clientService.registerClient(action.payload).pipe(
        map(data => new SignUpActions.RegisterClientDone(data)),
        catchError(error => of(new SignUpActions.RegisterClientFailed(error)))
      );
    })
  );
}
