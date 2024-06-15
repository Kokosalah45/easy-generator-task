import PageLayout from '@/components/layout/PageLayout';
import { useAuth } from '@/providers/AuthProvider';

const HomePage = () => {
  const { authState, user } = useAuth();

  const welcomeMessage =
    authState === 'authenticated' ? `${user?.name} 🎉` : 'Anonymous user 🥷';

  return (
    <PageLayout className="grid place-items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Welcome</h1>
        <h2 className="text-3xl font-semibold">{welcomeMessage}</h2>
      </div>
    </PageLayout>
  );
};

export default HomePage;
