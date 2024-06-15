import PageLayout from '@/components/layout/PageLayout';
import SignupForm from '@/features/SignupForm';

const SignupPage = () => {
  return (
    <PageLayout className="place-items-center grid">
      <SignupForm />
    </PageLayout>
  );
};

export default SignupPage;
