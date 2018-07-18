import { Client } from '../../models/client.model';
import * as SignupFormActions from './actions';

export interface State {
  isClientIdRepeated: boolean;
  wasSuccessful: boolean;
  wasSubmitted: boolean;
}

const initialState: State = {
  isClientIdRepeated: false,
  wasSuccessful: false,
  wasSubmitted: false
};

export function reducer(
  state = initialState,
  action: SignupFormActions.Actions
) {
  console.log('ON SIGNUP REDUCER ', action);
  switch (action.type) {
    case SignupFormActions.SEARCH_CLIENT_DONE:
      return {
        ...state,
        isClientIdRepeated: !!(action.payload && action.payload.id)
          ? true
          : false
      };
    case SignupFormActions.SEARCH_CLIENT_FAILED:
      return {
        ...state,
        isClientIdRepeated: !!(action.payload && action.payload.id)
          ? true
          : false
      };
    case SignupFormActions.REGISTER_CLIENT:
      return {
        ...state,
        wasSubmitted: true
      };
    case SignupFormActions.REGISTER_CLIENT_DONE:
      return {
        ...state,
        wasSubmitted: false,
        wasSuccessful: true
      };
    case SignupFormActions.REGISTER_CLIENT_FAILED:
      return {
        ...state,
        asSubmitted: false,
        wasSuccessful: false
      };
    default:
      return state;
  }
}
