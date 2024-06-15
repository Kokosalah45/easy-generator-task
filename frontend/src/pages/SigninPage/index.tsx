import PageLayout from '@/components/layout/PageLayout';
import SigninForm from '@/features/SigninForm';
import { useAuth } from '@/providers/AuthProvider';
import { Navigate } from 'react-router';

const SigninPage = () => {
  const { authState } = useAuth();

  if (authState === 'authenticated') {
    return <Navigate to="/" />;
  }

  return (
    <PageLayout className="place-items-center grid">
      <SigninForm />
    </PageLayout>
  );
};

export default SigninPage;
