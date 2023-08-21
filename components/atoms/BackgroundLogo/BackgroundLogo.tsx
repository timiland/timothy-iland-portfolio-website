import ColouredLogo, { IColouredLogo } from '@atoms/ColouredLogo/ColouredLogo';
import { motion, useScroll, useTransform } from 'framer-motion';

const BackgroundLogo = ({ colour, outlineColour }: IColouredLogo) => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.06]);

  const translateY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <motion.div
      className="fixed z-0 w-full"
      style={{ scale, opacity, translateY }}
    >
      <ColouredLogo
        className="scale-[130%] -translate-x-[100px] translate-y-[100px]"
        colour={colour}
        outlineColour={outlineColour}
      />
    </motion.div>
  );
};

export default BackgroundLogo;
