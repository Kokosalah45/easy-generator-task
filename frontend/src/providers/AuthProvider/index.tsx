import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import useAuthReducer, { AuthState, User } from './hooks/useAuthReducer';
import { TokenManager } from './services/token-manager';

const URLS = {
  SIGNIN: '/api/auth/signin',
  ME: '/api/auth/me',
  SIGNUP: '/api/auth/signup',
};

type SignInParams = {
  email: string;
  password: string;
};

type ErrorData = {
  message: string;
  statusCode: number;
  code: string;
};

type AuthOptions = {
  onError?: (error: ErrorData) => void;
  onSuccess?: () => void;
};

type SignUpParams = {
  email: string;
  password: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  signIn: (props: SignInParams, options?: AuthOptions) => Promise<void>;
  signOut: () => void;
  signUp: (props: SignUpParams, options?: AuthOptions) => Promise<void>;
  authState: AuthState;
} | null;

const AuthContext = createContext<AuthContextType>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { state, dispatch } = useAuthReducer();
  console.log({
    userData: state.user,
  });

  const getUserData = useCallback(async () => {
    try {
      const token = TokenManager.getToken();

      if (!token) {
        throw new Error('Not authenticated');
      }

      const res = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Not authenticated');
      }

      const data = await res.json();
      dispatch({ type: 'SET_USER', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_AUTH_STATE', payload: 'unauthenticated' });
    }
  }, [dispatch]);

  const signIn = useCallback(
    async ({ email, password }: SignInParams, options?: AuthOptions) => {
      const res = await fetch(URLS.SIGNIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = (await res.json()) as { access_token: string };

        TokenManager.setToken(data.access_token, {
          onSet: async () => {
            await getUserData().then(() => options?.onSuccess?.());
          },
        });

        return;
      }

      const errorData = (await res.json()) as ErrorData;

      options?.onError?.(errorData);
    },
    [getUserData],
  );

  const signUp = useCallback(
    async ({ email, password, name }: SignUpParams, options?: AuthOptions) => {
      const res = await fetch(URLS.SIGNUP, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (res.ok) {
        options?.onSuccess?.();
        return;
      }

      const errorData = (await res.json()) as ErrorData;

      options?.onError?.(errorData);
    },
    [],
  );

  const signOut = useCallback(() => {
    TokenManager.removeToken({
      onRemove: () => {
        dispatch({ type: 'CLEAR_USER' });
      },
    });
  }, [dispatch]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        authState: state.authState,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
