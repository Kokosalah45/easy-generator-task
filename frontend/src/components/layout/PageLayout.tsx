import { cn } from '@/lib/utils';
import { HTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren<HTMLAttributes<HTMLElement>>;

const PageLayout = ({ children, className, ...props }: Props) => {
  return (
    <main
      className={cn('row-start-2 row-end-2 container', className)}
      {...props}
    >
      {children}
    </main>
  );
};

export default PageLayout;
