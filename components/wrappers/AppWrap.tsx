import React, { HTMLAttributes, ElementType } from 'react';

import { NavigationDots, SocialMedia } from '..';

const AppWrapper = (
  Component: ElementType,
  idName: string,
  classNames: HTMLAttributes<HTMLDivElement>
) => {
  const Wrapper = () => (
    <div
      id={idName}
      className={`flex min-h-[100vh] w-full flex-row ${classNames}`}
    >
      <SocialMedia />
      <div className="flex w-full flex-1 items-center  justify-center px-4 py-16 pb-8 sm:px-8 sm:py-16">
        <Component />

        <div className="flex w-full items-end justify-end pt-8">
          <p className="p-text uppercase text-black">@2022 Rein</p>
        </div>
      </div>
      <NavigationDots active={idName} />
    </div>
  );

  return Wrapper;
};

export default AppWrapper;
