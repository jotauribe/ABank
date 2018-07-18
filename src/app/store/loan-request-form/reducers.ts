import { Client } from '../../models/client.model';
import * as LoanRequestActions from './actions';

export interface State {
  clients: Client[];
  response: string;
  loanAmount: number;
  wasSuccessful: boolean;
  wasSubmitted: boolean;
}

const initialState: State = {
  clients: [],
  response: 'NOT PROCESSED',
  loanAmount: 0,
  wasSuccessful: false,
  wasSubmitted: false
};

export function reducer(
  state = initialState,
  action: LoanRequestActions.Actions
) {
  console.log('ON LOAN-REQUEST REDUCER ', action);
  switch (action.type) {
    case LoanRequestActions.SAVE_EMPLOYMENT_INFO:
      return {
        ...state,
        wasSubmitted: true
      };
    case LoanRequestActions.SAVE_EMPLOYMENT_INFO_DONE:
      return {
        ...state,
        response: action.payload.response,
        loanAmount: action.payload.loanAmount,
        wasSubmitted: false,
        wasSuccessful: true
      };
    case LoanRequestActions.SAVE_EMPLOYMENT_INFO_FAILED:
      return {
        ...state,
        wasSubmitted: true,
        wasSuccessful: false
      };
    default:
      return state;
  }
}
