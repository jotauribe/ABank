import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Employment } from '../../models/employment.model';
import { LoanRequestResponse } from '../../models/loan-request-response.model';

// Action Types
export const SAVE_EMPLOYMENT_INFO = 'LOAN-REQUEST-FORM/Save employment info';
export const SAVE_EMPLOYMENT_INFO_DONE =
  'LOAN-REQUEST-FORM/Save employment info done';
export const SAVE_EMPLOYMENT_INFO_FAILED =
  'LOAN-REQUEST-FORM/Save employment info failed';

// Actions
export class SaveEmploymentInfo implements Action {
  readonly type = SAVE_EMPLOYMENT_INFO;

  constructor(public payload: Employment) {}
}

export class SaveEmploymentInfoDone implements Action {
  readonly type = SAVE_EMPLOYMENT_INFO_DONE;

  constructor(public payload: LoanRequestResponse) {}
}

export class SaveEmploymentInfoFailed implements Action {
  readonly type = SAVE_EMPLOYMENT_INFO_FAILED;

  constructor(public payload: any) {}
}

export type Actions =
  | SaveEmploymentInfo
  | SaveEmploymentInfoDone
  | SaveEmploymentInfoFailed;
