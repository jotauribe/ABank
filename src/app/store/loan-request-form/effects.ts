import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import * as LoanRequestActions from './actions';
import { ClientService } from '../../services/clientService';

@Injectable()
export class LoanRequestEffects {
  constructor(
    private actions$: Actions,
    private clientService: ClientService
  ) {}

  @Effect()
  fetchClient$: Observable<Action> = this.actions$.pipe(
    ofType(LoanRequestActions.SAVE_EMPLOYMENT_INFO),
    switchMap((action: LoanRequestActions.SaveEmploymentInfo) =>
      this.clientService.saveClientEmploymentInfo(action.payload).pipe(
        // If successful, dispatch success action with result
        map(data => {
          return new LoanRequestActions.SaveEmploymentInfoDone(data);
        }),
        // If request fails, dispatch failed action
        catchError(error =>
          of(new LoanRequestActions.SaveEmploymentInfoFailed(error))
        )
      )
    )
  );
}
