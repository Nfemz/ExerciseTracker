import {ActionCreator, Dispatch} from 'redux';
import {AppActions} from '../redux/actions';

export type AppDispatch = Dispatch<AppActions>;

export type AppThunk<T> = Promise<ActionCreator<T>>;
