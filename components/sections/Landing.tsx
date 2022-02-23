import { motion } from 'framer-motion';
import Image from 'next/image';

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

// const MotionImage = motion(Image);

const Landing = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/images/bgIMG.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center',
      }}
      className="relative flex h-[100vh] w-auto flex-1 flex-col justify-center px-4 pb-8 pt-24 md:w-full md:flex-row md:items-center md:pb-0 xl:px-32 xl:pt-32 2xl:px-64"
    >
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="mr-0 flex h-full w-full flex-[1] flex-col items-start justify-start md:mx-8 md:items-center md:justify-center"
      >
        <div className="flex w-full flex-col items-start justify-start xl:items-end xl:justify-center">
          <div className="flex w-auto flex-row items-center justify-center rounded-2xl px-8 py-4 shadow-[0px_0px_20px_rgba(0,0,0,0.1)]">
            <span className="text-4xl 2xl:text-7xl">👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Adam</h1>
            </div>
          </div>

          <div className="mt-4 flex w-auto flex-col items-center justify-center rounded-2xl px-8 py-4 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] md:mt-12">
            <p className="p-text w-full text-right uppercase">
              Software Engineer
            </p>
            <p className="p-text w-full text-right uppercase">Crypto Degen</p>
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
          src="/images/profile.jpeg"
          className="z-[1]"
          alt="profile_bg"
        />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src="/svgs/circle.svg"
          alt="profile_circle"
          className="absolute left-0 right-0 bottom-0 z-[0] h-[90%] w-full object-contain "
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="ml-0 flex h-full flex-[1] flex-row flex-wrap items-start justify-center gap-12 md:ml-4 md:flex-col md:gap-4"
      >
        {[
          '/images/flutter.png',
          '/images/redux.png',
          '/images/flutter.png',
          '/images/sass.png',
          '/images/flutter.png',
        ].map((url, index) => {
          const first = index === 0;
          const second = index === 1;
          const third = index === 2;
          const fourth = index === 3;
          const fifth = index === 4;
          const classNames = [
            first && 'w-14 h-14 hidden md:flex h-8 w-8 lg:h-16 lg:w-16',
            second && 'h-20 w-20 lg:h-28 lg:w-28 md:ml-10',
            third && 'lg:h-36 lg:w-36 md:ml-20 md:my-4',
            fourth && 'h-20 w-20 lg:h-28 lg:w-28 md:ml-10',
            fifth && 'hidden w-14 h-14 md:flex h-8 w-8 lg:h-16 lg:w-16',
          ].join(' ');

          return (
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.1)] ${classNames}`}
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
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Landing;
