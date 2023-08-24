import { ISbStoryData, SbBlokData, storyblokEditable } from '@storyblok/react';
import dynamic from 'next/dynamic';

import Button from '@atoms/Button/Button';
import { useConfig } from '@stores/configProvider';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import AnimateInOnScroll from '@atoms/AnimateInOnScroll/AnimateInOnScroll';
import DirectionEnum from '@models/enums/DirectionEnum';
import ISiteConfig from '@models/ISiteConfig';
import QuoteBox from 'components/molecules/QuoteBox/QuoteBox';
import IProject from '@models/IProject';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

export interface IProjectFeature extends SbBlokData {
  readonly title: string;
  readonly project: ISbStoryData;
}

const ProjectFeature = ({ blok }: { blok: IProjectFeature }) => {
  const { title, project } = blok;
  const {
    heroVideo,
    description,
    clientQuote,
    clientQuoteName,
    client,
    projectTitle,
    websiteUrl,
  } = project.content as IProject;

  const { labels } = useConfig() as ISiteConfig;

  const { readMoreLabel, viewWebsiteLabel, featuredCaseStudyLabel } = labels;

  return (
    <section
      className="w-full grid-container gap-y-24 component-padding"
      {...storyblokEditable(blok)}
    >
      <h2 className="text-center col-span-full text-yellow drop-shadow-black_lg">
        {title}
      </h2>
      <div className="xl:col-span-4 xl:col-start-2 flex flex-col gap-12 items-center">
        <div className="text-center flex flex-col gap-y-4">
          <p className="body-one">{featuredCaseStudyLabel}</p>
          <h3 className="text-yellow drop-shadow-black_lg">{client}</h3>
          {projectTitle && (
            <h4 className="text-yellow drop-shadow-black_lg pt-4">
              {projectTitle}
            </h4>
          )}
        </div>
        <p className="text-center text-white body-one">{description}</p>
      </div>
      <div className="xl:col-span-5 xl:col-start-7 flex flex-col justify-center gap-12">
        <div>
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
        <div className="flex gap-12 justify-center">
          <Button
            className="shadow-bold"
            href={project.path}
            style_={ButtonStyleEnum.Outline}
          >
            {readMoreLabel}
          </Button>
          <Button
            className="shadow-bold"
            href={websiteUrl.url}
            style_={ButtonStyleEnum.Outline}
          >
            {viewWebsiteLabel}
          </Button>
        </div>
      </div>
      <AnimateInOnScroll
        direction={DirectionEnum.Up}
        className="col-span-6 col-start-4"
      >
        <QuoteBox quote={clientQuote} clientQuoteName={clientQuoteName} />
      </AnimateInOnScroll>
    </section>
  );
};

export default ProjectFeature;
