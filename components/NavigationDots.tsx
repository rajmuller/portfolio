import React from 'react';

type NavigationDotsProps = {
  active: string;
};

const sections = ['home', 'about', 'work', 'skills', 'testimonial', 'contact'];

const NavigationDots = ({ active }: NavigationDotsProps) => (
  <div className="hidden flex-col items-center justify-center p-4 sm:flex">
    {sections.map((item) => (
      <a
        href={`#${item}`}
        key={item}
        className="m-2 h-2.5 w-2.5 rounded-full bg-[#cbcbcb] transition-colors duration-200 ease-in-out hover:bg-secondary 2xl:h-5 2xl:w-5"
        style={active === item ? { backgroundColor: '#313BAC' } : {}}
      />
    ))}
  </div>
);

export default NavigationDots;
