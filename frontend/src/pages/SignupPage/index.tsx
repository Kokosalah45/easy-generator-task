import PageLayout from '@/components/layout/PageLayout';
import SignupForm from '@/features/SignupForm';
import { useAuth } from '@/providers/AuthProvider';
import { Navigate } from 'react-router';

const SignupPage = () => {
  const { authState } = useAuth();

  if (authState === 'authenticated') {
    return <Navigate to="/" />;
  }
  return (
    <PageLayout className="place-items-center grid">
      <SignupForm />
    </PageLayout>
  );
};

export default SignupPage;
