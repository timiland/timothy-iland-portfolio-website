import Button from '@atoms/Button/Button';
import { SbImage } from '@atoms/SbImage/SbImage';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import IAsset from '@models/IAsset';
import ILink from '@models/ILink';
import ISiteConfig from '@models/ISiteConfig';
import { useConfig } from '@stores/configProvider';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export interface ICtaPopOutSection extends SbBlokData {
  readonly title: string;
  readonly text: string;
  readonly image: IAsset;
  readonly link?: ILink[];
  readonly downloadFile?: IAsset;
}

const CtaPopOutSection = ({ blok }: { blok: ICtaPopOutSection }) => {
  const { title, text, image, downloadFile } = blok;

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const springScrollY = useSpring(scrollYProgress, {
    bounce: 0.5,
    mass: 0.25,
  });

  const translateY = useTransform(springScrollY, [0, 1], ['-110px', '110px']);

  const { labels } = useConfig() as ISiteConfig;

  const { downloadResumeLabel } = labels;

  return (
    <div className="component-padding">
      <section
        className="w-full grid-container relative"
        {...storyblokEditable(blok)}
      >
        <div
          ref={ref}
          className="xl:col-start-2 xl:col-span-6 bg-gradient-to-b from-black-100 to-black text-white p-10 xl:p-20 rounded-3xl relative z-10 shadow-bold border-yellow border-2"
        >
          <div className="flex flex-col justify-start items-start gap-10 xl:gap-20 whitespace-pre-line">
            <h3>{title}</h3>
            {text}
            <Button
              href={downloadFile?.filename}
              download
              style_={ButtonStyleEnum.Outline}
            >
              {downloadResumeLabel}
            </Button>
          </div>
        </div>
        <motion.div
          className="absolute hidden xl:flex z-20 top-0 2xl:-top-10 right-0 2xl:right-20 h-[110%] drop-shadow-lg"
          style={{ translateY }}
        >
          <SbImage
            className="w-full h-full drop-shadow-md"
            src={image.filename}
            alt={image.alt}
          />
        </motion.div>
      </section>
    </div>
  );
};

export default CtaPopOutSection;
