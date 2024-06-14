import PageLayout from '@/components/layout/PageLayout';
import { useAuth } from '@/providers/AuthProvider';

const HomePage = () => {
  const { authState, user } = useAuth();

  const welcomeMessage =
    authState === 'authenticated' ? `${user?.name} 🎉` : 'Anonymous user 🥷';

  return (
    <PageLayout className="grid place-items-center">
      <div className="text-center">
        <h1>Welcome</h1>
        <p>{welcomeMessage}</p>
      </div>
    </PageLayout>
  );
};

export default HomePage;
