import {UserInfo} from '../types/user.types';
import {AppActions, SET_USER} from './actions';

export interface AppState {
  user: UserInfo | null;
}

const initialState = {
  user: null,
};

export const reducer = (state: AppState = initialState, action: AppActions) => {
  const {type, payload} = action;
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};
