import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Client } from '../../models/client.model';

// Action Types
export const SEARCH_CLIENT = 'SIGNUP-FORM/Search client';
export const SEARCH_CLIENT_DONE = 'SIGNUP-FORM/Search client done';
export const SEARCH_CLIENT_FAILED = 'SIGNUP-FORM/Search client failed';
export const REGISTER_CLIENT = 'SIGNUP-FORM/Register client';
export const REGISTER_CLIENT_DONE = 'SIGNUP-FORM/Register client done';
export const REGISTER_CLIENT_FAILED = 'SIGNUP-FORM/Register client failed';

// Actions
export class SearchClient implements Action {
  readonly type = SEARCH_CLIENT;

  constructor(public payload: number) {}
}

export class SearchClientDone implements Action {
  readonly type = SEARCH_CLIENT_DONE;

  constructor(public payload: Client) {}
}

export class SearchClientFailed implements Action {
  readonly type = SEARCH_CLIENT_FAILED;

  constructor(public payload: any) {}
}

export class RegisterClient implements Action {
  readonly type = REGISTER_CLIENT;

  constructor(public payload: Client) {}
}

export class RegisterClientDone implements Action {
  readonly type = REGISTER_CLIENT_DONE;

  constructor(public payload: Client) {}
}

export class RegisterClientFailed implements Action {
  readonly type = REGISTER_CLIENT_FAILED;

  constructor(public payload: any) {}
}

export type Actions =
  | SearchClient
  | SearchClientDone
  | SearchClientFailed
  | RegisterClient
  | RegisterClientDone
  | RegisterClientFailed;
