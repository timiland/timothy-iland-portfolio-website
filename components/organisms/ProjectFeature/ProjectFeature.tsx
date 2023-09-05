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

  const { readMoreLabel, viewWebsiteLabel, clientLabel, projectLabel } = labels;

  return (
    <section
      className="w-full grid-container gap-y-24 component-padding xl:mb-[150px]"
      {...storyblokEditable(blok)}
    >
      {title && (
        <h2 className="text-center col-span-full text-yellow drop-shadow-black_lg">
          {title}
        </h2>
      )}
      <div className="relative xl:col-span-10 xl:col-start-2 flex flex-col lg:grid lg:grid-cols-2 gap-12 bg-green-600 rounded-3xl pb-8 lg:pb-40 p-6 lg:p-12 shadow-xl">
        <div className="flex flex-col xl:h-full justify-between gap-y-6 pt-6 w-full">
          <div>
            <p className="underline underline-offset-4 xl:pl-12">
              {clientLabel}:
            </p>
            <h5 className="xl:text-center text-yellow drop-shadow-black_sm pt-2">
              {client}
            </h5>
          </div>
          <div>
            <p className="underline underline-offset-4 xl:pl-12">
              {projectLabel}:
            </p>
            {projectTitle && (
              <h5 className="xl:text-center text-yellow drop-shadow-black_sm pt-2">
                {projectTitle}
              </h5>
            )}
          </div>
          <p className="xl:text-center col-span-full body-sm 2xl:px-4 text-white">
            {description}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-12 w-full">
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
          <div className="flex flex-col xl:flex-row gap-12 items-start justify-center">
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
        <div className="col-span-6 col-start-4 hidden xl:flex xl:absolute -bottom-40 w-2/3 left-1/2 -translate-x-1/2">
          <AnimateInOnScroll direction={DirectionEnum.Up}>
            <QuoteBox quote={clientQuote} clientQuoteName={clientQuoteName} />
          </AnimateInOnScroll>
        </div>
      </div>
    </section>
  );
};

export default ProjectFeature;
