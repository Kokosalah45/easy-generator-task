import { cn } from '@/lib/utils';
import { PropsWithChildren, HTMLAttributes } from 'react';

type Props = PropsWithChildren<HTMLAttributes<HTMLElement>>;

const MainLayout = ({ children, className, ...props }: Props) => {
  return (
    <main
      className={cn(
        'min-h-screen grid grid-rows-main-layout bg-slate-900',
        className,
      )}
      {...props}
    >
      {children}
    </main>
  );
};

export default MainLayout;
