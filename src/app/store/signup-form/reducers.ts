import { Client } from '../../models/client.model';
import * as SignupFormActions from './actions';

export interface State {
  isClientIdRepeated: boolean;
}

const initialState: State = {
  isClientIdRepeated: false
};

export function reducer(
  state = initialState,
  action: SignupFormActions.Actions
) {
  switch (action.type) {
    case SignupFormActions.SEARCH_CLIENT_DONE:
      return {
        isClientIdRepeated: !!(action.payload && action.payload.id)
          ? true
          : false
      };
    case SignupFormActions.SEARCH_CLIENT_FAILED:
      return {
        isClientIdRepeated: !!(action.payload && action.payload.id)
          ? true
          : false
      };
    case SignupFormActions.REGISTER_CLIENT_DONE:
      return {
        isClientIdRepeated: !!(action.payload && action.payload.id)
          ? true
          : false
      };
    case SignupFormActions.REGISTER_CLIENT_FAILED:
      return {
        isClientIdRepeated: !!(action.payload && action.payload.id)
          ? true
          : false
      };
    default:
      return state;
  }
}
