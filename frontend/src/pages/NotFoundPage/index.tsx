import PageLayout from '@/components/layout/PageLayout';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <PageLayout className="h-screen grid place-items-center">
      <div className="text-center flex flex-col gap-5">
        <h1 className="text-4xl">
          The page that you are requesting is not found
        </h1>
        <h3 className="text-3xl underline">
          <Link to="/">Go Back to Welcome Page</Link>
        </h3>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;
