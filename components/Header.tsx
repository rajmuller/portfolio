import { useState } from 'react';
import Image from 'next/image';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const sections = ['home', 'about', 'work', 'skills', 'contact'];

const Header = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="fixed z-[2] flex w-full items-center justify-between bg-white bg-opacity-25 py-4 px-8 backdrop-blur-sm">
      <div className="relative flex h-[20px] w-[90px] items-center justify-start 2xl:h-[40px] 2xl:w-[180px]">
        <Image
          src="/images/logo.png"
          alt="logo"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <ul className="hidden flex-1 items-center justify-center lg:flex">
        {sections.map((item) => (
          <li
            className="p-text mx-4 my-2 flex cursor-pointer flex-col items-center justify-center"
            key={`link-${item}`}
          >
            <motion.a
              className="flex select-none flex-col font-medium  uppercase text-gray transition-colors duration-300 ease-in-out hover:text-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              draggable="false"
              href={`#${item}`}
              onDrag={(e) => e.preventDefault()}
            >
              {item}
            </motion.a>
          </li>
        ))}
      </ul>

      <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white lg:hidden">
        <HiMenuAlt4 className="text-2xl" onClick={() => setToggle(true)} />

        <AnimatePresence>
          {toggle && (
            <motion.div
              className="fixed top-0 bottom-0 right-0 z-[5] flex h-[100vh] w-3/5 flex-col items-end justify-end bg-white bg-cover bg-repeat p-4 pt-2 pr-2 shadow-[0px_0px_20px_rgba(168,168,168,0.35)] "
              style={{
                backgroundImage: 'url("/images/bgWhite.png")',
                backgroundPosition: '10% 10%',
              }}
              initial={{ x: '100%', opacity: 0 }}
              exit={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <HiX
                className="my-3 mx-6 h-8 w-8 text-secondary"
                onClick={() => setToggle(false)}
              />
              <ul className="flex h-full w-full flex-col items-start justify-start">
                {sections.map((item) => (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="m-4"
                    key={item}
                  >
                    <a
                      className="text-base font-medium uppercase text-gray transition-colors duration-300 ease-in-out hover:text-secondary"
                      href={`#${item}`}
                      draggable="false"
                      onClick={() => setToggle(false)}
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// TODO: animate the backround balls with svg instead

export default Header;
