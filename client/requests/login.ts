import {setUser} from '../redux/actions';
import {AppState} from '../redux/reducers';
import {AppDispatch, AppThunk} from '../types/redux.types';
import {UserInfo} from '../types/user.types';

export const loginUser = async (
  email: string,
  password: string,
): AppThunk<Promise<UserInfo | undefined>> => {
  return async (
    dispatch: AppDispatch,
    getState: () => AppState,
  ): Promise<UserInfo | undefined> => {
    try {
      const state = getState();
      if (state.user) {
        throw new Error('User already logged in');
      }

      const res = await fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const {user} = await res.json();
      dispatch(setUser(user));
      return user;
    } catch (err) {
      console.warn('failure to loginUser', err);
    }
  };
};
