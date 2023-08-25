import ColouredLogo, { IColouredLogo } from '@atoms/ColouredLogo/ColouredLogo';
import { motion, useScroll, useTransform } from 'framer-motion';

const BackgroundLogo = ({ colour, outlineColour }: IColouredLogo) => {
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);

  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.1, 0.07]);

  const translateY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <motion.div
      className="fixed z-0 w-full"
      style={{ scale, opacity, translateY }}
    >
      <ColouredLogo
        className="scale-[200%] xl:scale-[130%] xl:-translate-x-[100px] translate-y-[40vh] xl:translate-y-[100px]"
        colour={colour}
        outlineColour={outlineColour}
      />
    </motion.div>
  );
};

export default BackgroundLogo;
