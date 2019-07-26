import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  error: string;
  loading: boolean;
}
const initialState = {
  user: null,
  error: null,
  loading: false
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return { ...state, user, loading: false, error: null };
    case AuthActions.LOGOUT:
      return { ...state, user: null, loading: false, error: null };
    case AuthActions.LOGIN_START:
      return { ...state, loading: true, error: null };
    case AuthActions.AUTHENTICATE_FAIL:
      return { ...state, error: action.payload, loading: false };
    case AuthActions.SIGNUP_START:
      return { ...state, error: null, loading: true };
    case AuthActions.CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
}
