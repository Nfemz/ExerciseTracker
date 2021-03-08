import {UserInfo} from '../types/user.types';
export const SET_USER = 'SET_USER';

export const setUser = (userInfo: UserInfo) => ({
  type: SET_USER,
  payload: userInfo,
});

export type AppActions = ReturnType<typeof setUser>;
