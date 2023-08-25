import { SbImage } from '@atoms/SbImage/SbImage';
import IAsset from '@models/IAsset';
import ITextBlock from '@models/ITextBlock';
import {
  renderRichText,
  SbBlokData,
  storyblokEditable,
} from '@storyblok/react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export interface IBulletSection extends SbBlokData {
  readonly title: string;
  readonly text: string;
  readonly bullets: ITextBlock[];
  readonly image: IAsset;
}

const BulletSection = ({ blok }: { blok: IBulletSection }) => {
  const { bullets, title, text, image } = blok;

  const ref = useRef<HTMLUListElement>(null);

  const inView = useInView(ref, { once: true, amount: 0.75 });

  return (
    <section
      className="grid-container component-padding"
      {...storyblokEditable(blok)}
    >
      <div className="xl:col-span-5 xl:col-start-2 flex flex-col justify-center drop-shadow-xl body-two">
        <SbImage
          alt={image?.alt}
          src={image?.filename}
          sizes={`
          (max-width: 710px) 120px,
          (max-width: 991px) 193px,
            278px`}
        />
      </div>
      <div className="xl:col-span-4 xl:col-start-8 flex flex-col gap-12">
        <h3 className="whitespace-pre-line text-yellow drop-shadow-black_lg ">
          {title}
        </h3>
        <p className="body-lg">{text}</p>
        <ul className="list-disc flex-col flex gap-8 pl-4" ref={ref}>
          {bullets.map((textBlock, index) => (
            <motion.li
              initial={{ opacity: 0, translateY: 50 }}
              animate={
                inView
                  ? { opacity: 1, translateY: 0 }
                  : { opacity: 0, translateY: 50 }
              }
              transition={{
                duration: 0.4,
                delay: 0.3 * index,
                ease: [0, 0, 0.32, 1],
              }}
              {...storyblokEditable(textBlock)}
              dangerouslySetInnerHTML={{
                __html: renderRichText(textBlock.text),
              }}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BulletSection;
