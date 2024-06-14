import PageLayout from '@/components/layout/PageLayout';
import SigninForm from '@/features/SigninForm';

const SigninPage = () => {
  return (
    <PageLayout className="place-items-center grid">
      <SigninForm />
    </PageLayout>
  );
};

export default SigninPage;
