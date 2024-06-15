import { cn } from '@/lib/utils';
import {
  Children,
  ReactElement,
  PropsWithChildren,
  HTMLAttributes,
} from 'react';

type slotNames = 'start' | 'end' | 'center';

type HeaderSlots = {
  [key in slotNames]: ReactElement[];
};

const Slot = ({ children }: PropsWithChildren<{ name: slotNames }>) => children;

export const Header = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLElement>>) => {
  const childrenArray = Children.toArray(children) as ReactElement[];

  const defaultValue: HeaderSlots = {
    start: [],
    end: [],
    center: [],
  };

  const slots = childrenArray.reduce<HeaderSlots>((acc, child) => {
    const slotName = child.props.name as slotNames;
    acc[slotName].push(child);
    return acc;
  }, defaultValue);

  return (
    <header
      className={cn('sticky top-0 row-start-1 row-end-2', className)}
      {...props}
    >
      <div className="container flex justify-between items-center">
        <div className="flex items-center">{slots.start}</div>
        <div className="flex items-center">{slots.center}</div>
        <div className="flex items-center">{slots.end}</div>
      </div>
    </header>
  );
};

Header.Slot = Slot;

export default Header;
