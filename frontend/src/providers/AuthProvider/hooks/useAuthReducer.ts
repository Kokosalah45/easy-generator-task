import { useReducer } from 'react';

export type User = {
  name: string;
  email: string;
};

export type AuthState = 'loading' | 'authenticated' | 'unauthenticated';

export type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'CLEAR_USER' }
  | { type: 'SET_AUTH_STATE'; payload: AuthState };

type ReducerState = {
  user: User | null;
  authState: AuthState;
};

const initialState: ReducerState = {
  user: null,
  authState: 'loading',
};

const authReducer = (state: ReducerState, action: AuthAction): ReducerState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, authState: 'authenticated' };
    case 'CLEAR_USER':
      return { ...state, user: null, authState: 'unauthenticated' };
    case 'SET_AUTH_STATE':
      return { ...state, authState: action.payload };
    default:
      return state;
  }
};

export default function useAuthReducer() {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return { state, dispatch };
}
