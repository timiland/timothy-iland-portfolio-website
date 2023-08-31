import { SbImage } from '@atoms/SbImage/SbImage';
import IProject from '@models/IProject';
import ISiteConfig from '@models/ISiteConfig';
import { useConfig } from '@stores/configProvider';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import Accordion from 'components/molecules/Accordion/Accordion';
import dynamic from 'next/dynamic';
import QuoteBox from 'components/molecules/QuoteBox/QuoteBox';
import { useRef } from 'react';
import { useScroll, useSpring, useTransform, motion } from 'framer-motion';
import clsx from 'clsx';
import AnimateInOnScroll from '@atoms/AnimateInOnScroll/AnimateInOnScroll';
import DirectionEnum from '@models/enums/DirectionEnum';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const Project = ({ blok: project }: { blok: IProject }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { labels } = useConfig() as ISiteConfig;

  const { clientLabel, projectLabel, keyFeaturesLabel, briefLabel } = labels;

  const {
    additionalComponents,
    brief,
    client,
    clientQuote,
    clientQuoteName,
    heroImage,
    heroVideo,
    images,
    keyFeatures,
    personalProject,
    projectTitle,
  } = project;

  const imageClassesTemplate = [
    'xl:col-span-6 xl:col-start-5',
    'xl:col-span-7 xl:col-start-2',
    'xl:col-span-6 xl:col-start-5',
    'xl:col-span-7 xl:col-start-2',
  ];

  const imageClasses = Array.from(
    { length: images.length },
    (_, index) => imageClassesTemplate[index % imageClassesTemplate.length]
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const springScrollY = useSpring(scrollYProgress, {
    bounce: 0.5,
    mass: 0.25,
  });

  const translateY = useTransform(springScrollY, [0, 1], ['-50px', '50px']);

  return (
    <main
      {...storyblokEditable(project)}
      className="flex flex-col items-center min-h-screen overflow-x-clip"
    >
      <section
        className="relative w-full grid-container component-padding gap-y-40"
        {...storyblokEditable(project)}
      >
        <div className="xl:col-start-2 xl:col-span-10 flex flex-col gap-6 p-12 bg-green-550 rounded-3xl">
          <div className="flex flex-col">
            <p className="body-sm underline underline-offset-4">
              {projectLabel}:
            </p>
            <h4 className="text-yellow drop-shadow-black_lg pt-2">
              {projectTitle}
            </h4>
          </div>
          {!personalProject && (
            <>
              <div>
                {clientLabel && (
                  <p className="body-sm underline underline-offset-4">
                    {clientLabel}:
                  </p>
                )}
                <h4 className="text-yellow drop-shadow-black_lg pt-2">
                  {client}
                </h4>
              </div>
              <div>
                {clientLabel && briefLabel && (
                  <p className="body-sm underline underline-offset-4">
                    {briefLabel}
                  </p>
                )}
                {brief && <p className="text-[16px] pt-4">{brief}</p>}
              </div>
            </>
          )}
          <ReactPlayer
            muted
            class="video-radius"
            url={heroVideo?.filename}
            playsinline
            playing
            loop
            height="100%"
            width="100%"
          />
        </div>
        <div className="xl:col-start-2 xl:col-span-10 flex flex-col gap-20">
          {!!keyFeatures.length && (
            <Accordion
              embedded
              blok={{ title: keyFeaturesLabel, items: keyFeatures }}
            />
          )}
        </div>

        <div
          ref={ref}
          className="relative col-span-full lg:grid lg:grid-cols-2 xl:grid-cols-12 xl:gap-x-8 gap-x-6"
        >
          <SbImage
            className="rounded-3xl shadow-bold xl:col-start-2 gap-24 xl:col-span-8 w-full"
            key={heroImage.alt}
            alt={heroImage.alt}
            sizes="(max-width: 400px) 480px, 100vw"
            src={heroImage.filename}
          />
          <motion.div
            className="absolute w-1/2 -bottom-10 right-32"
            style={{ translateY }}
          >
            <QuoteBox clientQuoteName={clientQuoteName} quote={clientQuote} />
          </motion.div>
        </div>
        {images.map((image, index) => (
          <AnimateInOnScroll
            direction={DirectionEnum.Up}
            className={clsx(imageClasses[index], 'w-full relative')}
          >
            <SbImage
              className="w-full rounded-3xl shadow-bold"
              key={image.alt}
              alt={image.alt}
              sizes="(max-width: 400px) 480px, 600px"
              src={image.filename}
            />
            <div
              className={clsx(
                index % 2 === 0 ? '-left-10' : '-right-10',
                'border-2 border-yellow bg-black absolute -bottom-10 p-6 shadow-bold rounded-3xl'
              )}
            >
              {image.title}
            </div>
          </AnimateInOnScroll>
        ))}
      </section>
      {additionalComponents.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default Project;
