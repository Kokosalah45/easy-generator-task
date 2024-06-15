import { useAuth } from '@/providers/AuthProvider';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const AuthButtonsPanel = () => {
  const { authState, signOut } = useAuth();

  return (
    <div className="flex gap-2">
      <Button
        onClick={
          authState === 'authenticated'
            ? async () => {
                await signOut();
              }
            : undefined
        }
        asChild={authState === 'unauthenticated'}
      >
        {authState === 'unauthenticated' ? (
          <Link to="/auth/signin">Sign in</Link>
        ) : (
          'Sign out'
        )}
      </Button>
      {authState === 'unauthenticated' && (
        <Button asChild>
          <Link to="/auth/signup">Sign up</Link>
        </Button>
      )}
    </div>
  );
};

export default AuthButtonsPanel;
