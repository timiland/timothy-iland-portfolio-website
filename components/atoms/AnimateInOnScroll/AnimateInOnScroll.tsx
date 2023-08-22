import DirectionEnum from '@models/enums/DirectionEnum';
import { ReactNode, useRef } from 'react';
import { useInView, motion } from 'framer-motion';

export interface IAnimateInOnScroll {
  className?: string;
  children: ReactNode;
  direction: DirectionEnum;
}

const AnimateInOnScroll = ({
  className,
  children,
  direction = DirectionEnum.Up,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const inView = useInView(ref, { once: true, amount: 0.75 });

  const y =
    (direction === DirectionEnum.Up || direction === DirectionEnum.Down
      ? 50
      : 0) * (direction === DirectionEnum.Down ? -1 : 1);

  const x =
    (direction === DirectionEnum.Left || direction === DirectionEnum.Right
      ? 50
      : 0) * (direction === DirectionEnum.Down ? -1 : 1);

  const imageVariants = {
    visible: { opacity: 1, y: 0, x: 0, transition: { duration: 0.75 } },
    hidden: { opacity: 0, y, x },
  };
  return (
    <motion.div
      ref={ref}
      className={className}
      animate={inView ? 'visible' : 'hidden'}
      initial="hidden"
      variants={imageVariants}
    >
      {children}
    </motion.div>
  );
};

export default AnimateInOnScroll;
