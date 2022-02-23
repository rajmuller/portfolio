import { ComponentType, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
// TODO:switch to hooks or smth
const MotionWrap = (
  Component: ComponentType,
  classNames: HTMLAttributes<HTMLDivElement>
) => {
  const Wrapper = () => (
    <motion.div
      whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-center ${classNames}`}
    >
      <Component />
    </motion.div>
  );

  return Wrapper;
};

export default MotionWrap;
