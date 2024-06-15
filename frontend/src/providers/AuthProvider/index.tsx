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
  signOut: () => Promise<void>;
  signUp: (props: SignUpParams, options?: AuthOptions) => Promise<void>;
  authState: AuthState;
} | null;

const AuthContext = createContext<AuthContextType>(null);

type StorageTypes = 'localStorage' | 'cookie';

export const AuthProvider = ({
  children,
  storageType = 'localStorage',
}: PropsWithChildren<{
  storageType: StorageTypes;
}>) => {
  const { state, dispatch } = useAuthReducer();

  const getUserData = useCallback(async () => {
    try {
      const headers = new Headers();

      if (storageType === 'localStorage') {
        const token = TokenManager.getToken();
        if (!token) {
          dispatch({ type: 'CLEAR_USER' });
          throw new Error('Not authenticated');
        }

        headers.append('Authorization', `Bearer ${token}`);
      }

      const res = await fetch(URLS.ME, {
        headers,
        credentials: 'include',
      });

      if (!res.ok) {
        dispatch({ type: 'CLEAR_USER' });
        throw new Error('Not authenticated');
      }

      const data = await res.json();
      dispatch({ type: 'SET_USER', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_AUTH_STATE', payload: 'unauthenticated' });
    }
  }, [dispatch, storageType]);

  const signIn = useCallback(
    async ({ email, password }: SignInParams, options?: AuthOptions) => {
      console.log('signIn', storageType);
      const queryParams = new URLSearchParams();

      queryParams.append('storageType', storageType);

      const res = await fetch(`${URLS.SIGNIN}?${queryParams.toString()}`, {
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
    [getUserData, storageType],
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

  const signOut = useCallback(async () => {
    console.log('signOut', storageType);
    if (storageType === 'localStorage') {
      TokenManager.removeToken({
        onRemove: () => {
          dispatch({ type: 'CLEAR_USER' });
        },
      });
      return;
    }

    await fetch('/api/auth/signout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(() => {
        dispatch({ type: 'CLEAR_USER' });
      })
      .catch(() => {});
  }, [dispatch, storageType]);

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
