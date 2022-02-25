import { ReactNode } from 'react';

type TooltipProps = {
  children: ReactNode;
  show: boolean;
};

const Tooltip = ({ children, show }: TooltipProps) => {
  if (!show) {
    return null;
  }

  return (
    <div className="absolute top-0 left-1/2 min-w-full max-w-xs -translate-x-1/2 translate-y-[-110%] items-center justify-center rounded bg-zinc-700 p-4 leading-normal text-white opacity-100 shadow-[0px_0px_25px_rgba(0,0,0,0.1)] 2xl:max-w-lg">
      {children}
    </div>
  );
};

export default Tooltip;
