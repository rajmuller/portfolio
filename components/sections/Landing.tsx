import { motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import { Tooltip } from '..';

import { getRndInteger } from '../../util';

import { MotionWrapper, Wrapper } from '../wrappers';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Landing = () => {
  const [revealed, setRevealed] = useState(false);
  const [high5Hovered, setHigh5Hovered] = useState(false);
  const [alreadyHigh5d, setAlreadyHigh5d] = useState(false);
  const counter = useRef(0);

  const toggle = useCallback(() => {
    counter.current++;
    if (counter.current > 9) {
      setRevealed(true);
      return;
    }

    setAlreadyHigh5d(true);
    setRevealed(!revealed);
  }, [revealed]);

  console.log({ revealed });

  return (
    <MotionWrapper>
      <Wrapper
        idName="landing"
        style={{
          backgroundImage: "url('/images/bgIMG.png')",
          backgroundSize: 'cover',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative flex h-full w-full flex-1 select-none flex-col justify-center px-4 pb-8 pt-24 md:w-full md:flex-row md:items-center md:pt-24 md:pb-0 xl:px-32 xl:pt-32 2xl:px-48">
          <motion.div
            whileInView={{ x: [-100, 0], opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
            className="mr-0 flex h-full w-full flex-[1] flex-col items-start justify-start md:mx-8 md:items-center md:justify-center"
          >
            <div className="flex w-full flex-col items-start justify-start xl:items-end xl:justify-center">
              <div className="flex w-auto flex-row items-center justify-center rounded-2xl px-8 py-4 shadow-[0px_0px_20px_rgba(0,0,0,0.1)]">
                <span onClick={toggle} className="relative">
                  <span
                    className=" cursor-pointer text-4xl 2xl:text-7xl"
                    onMouseEnter={() => setHigh5Hovered(true)}
                    onMouseLeave={() => setHigh5Hovered(false)}
                  >
                    👋
                  </span>
                  <Tooltip show={high5Hovered && !alreadyHigh5d}>
                    Gimme a high 5
                  </Tooltip>
                </span>
                <div style={{ marginLeft: 20 }}>
                  <p className="p-text mb-4 text-right">Hello there, I am</p>
                  <h1
                    style={{ textAlign: 'right' }}
                    className="head-text leading-none"
                  >
                    Adam <span>Rein</span> Rajmuller
                  </h1>
                </div>
              </div>

              <div className="mt-4 flex w-auto flex-col items-center justify-center rounded-2xl px-8 py-4 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] md:mt-12">
                <p className="p-text w-full text-right uppercase">
                  Software Engineer
                </p>
                <p className="p-text w-full text-right uppercase">
                  Crypto Degen
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileInView={{ opacity: [0, 1] }}
            transition={{ duration: 0.5, delayChildren: 0.5 }}
            className="flex-2 relative my-8 flex h-full w-full items-end justify-end xl:my-0"
          >
            <Image
              layout="fill"
              objectFit="contain"
              src={
                counter.current < 10 ? '/images/sub2.png' : '/images/shrek.png'
              }
              className={`z-[1] transition-all duration-700 ease-linear ${
                !revealed ? 'brightness-[0.2]' : 'brightness-[1]'
              }`}
              alt="profile_picture"
            />
            <motion.img
              animate={{
                scale: [1, 1.05],
              }}
              transition={{
                repeat: Infinity,
                duration: 10,
                ease: 'linear',
                repeatType: 'mirror',
              }}
              src="/svgs/circle-pink.svg"
              alt="profile_circle"
              className="absolute left-0 right-0 bottom-0 z-[0] h-[90%] w-full object-contain "
            />
          </motion.div>

          <motion.div
            variants={scaleVariants}
            whileInView={scaleVariants.whileInView}
            className="ml-0 flex h-full flex-[1] flex-row flex-wrap items-start justify-center gap-8 md:ml-4 md:flex-col md:gap-4"
          >
            {[
              '/images/graphql.png',
              '/images/react.png',
              '/images/nextjs.png',
              '/images/redux.png',
            ].map((url, index) => {
              const first = index === 0;
              const second = index === 1;
              const third = index === 2;
              const fourth = index === 3;
              const classNames = [
                first && 'w-12 h-12 hidden md:flex h-8 w-8 lg:h-16 lg:w-16',
                second && 'h-16 w-16 lg:h-28 lg:w-28 md:ml-10',
                third &&
                  'w-20 h-20 lg:h-36 lg:w-36 md:ml-20 md:my-4 translate-y-4 md:translate-y-0',
                fourth && 'h-16 w-16 lg:h-28 lg:w-28 md:ml-10',
              ].join(' ');

              return (
                <motion.div
                  animate={{
                    y: [0, -17],
                    x: [0, getRndInteger(-10, 10)],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: getRndInteger(6, 8),
                    delay: getRndInteger(0, 5),
                    ease: 'linear',
                    repeatType: 'mirror',
                  }}
                  className={`flex items-center justify-center rounded-full bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.1)] ${classNames}`}
                  key={`circle-${index}`}
                >
                  <div className="relative h-2/3 w-2/3">
                    <Image
                      layout="fill"
                      objectFit="contain"
                      src={url}
                      alt="profile_bg"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Wrapper>
    </MotionWrapper>
  );
};

export default Landing;
