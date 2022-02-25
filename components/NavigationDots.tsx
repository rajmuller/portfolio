type NavigationDotsProps = {
  active: string;
};

const sections = ['landing', 'about', 'works', 'skills', 'contact'];

const NavigationDots = ({ active }: NavigationDotsProps) => {
  return (
    <div className="hidden select-none flex-col items-center justify-center p-4 sm:flex">
      {sections.map((item) => (
        <a
          href={`#${item}`}
          key={item}
          className={`m-2 h-2.5 w-2.5 rounded-full bg-[#cbcbcb] transition-colors duration-200 ease-in-out hover:bg-secondary ${
            active === item ? 'bg-secondary' : ''
          }`}
        />
      ))}
    </div>
  );
};

export default NavigationDots;
