import { Outlet } from 'react-router';
import { useAuth } from './providers/AuthProvider';

function App() {
  const { authState, user } = useAuth();
  console.log({ authState, user });
  return <Outlet />;
}

export default App;
