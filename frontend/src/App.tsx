import { Outlet } from 'react-router';
import Header from './components/layout/Header';
import MainLayout from './components/layout/MainLayout';
import { Button } from './components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from './providers/AuthProvider';
function App() {
  const { authState, signOut } = useAuth();
  return (
    <MainLayout>
      <Header>
        <Header.Slot name="start">
          <h1 className="text-3xl font-bold">My App</h1>
        </Header.Slot>

        <Header.Slot name="end">
          <div className="flex gap-2">
            <Button
              onClick={authState === 'authenticated' ? signOut : undefined}
              asChild={authState === 'unauthenticated'}
            >
              {authState === 'unauthenticated' ? (
                <Link to="/signin">Sign in</Link>
              ) : (
                'Sign out'
              )}
            </Button>
            {authState === 'unauthenticated' && (
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            )}
          </div>
        </Header.Slot>
      </Header>
      <Outlet />
    </MainLayout>
  );
}

export default App;
