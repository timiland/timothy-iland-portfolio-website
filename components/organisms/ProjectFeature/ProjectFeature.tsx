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
      className="w-full grid-container gap-y-24 component-padding mb-[150px]"
      {...storyblokEditable(blok)}
    >
      {title && (
        <h2 className="text-center col-span-full text-yellow drop-shadow-black_lg">
          {title}
        </h2>
      )}
      <div className="relative xl:col-span-10 xl:col-start-2 grid lg:grid-cols-2 gap-12 bg-green-600 rounded-3xl pb-40 lg:pb-40 p-6 lg:p-12">
        <div className="flex flex-col h-full justify-center gap-y-6">
          <div>
            <p className="underline underline-offset-4 pl-12">{clientLabel}:</p>
            <h5 className="text-center text-yellow drop-shadow-black_sm pt-2">
              {client}
            </h5>
          </div>
          <div>
            <p className="underline underline-offset-4 pl-12">
              {projectLabel}:
            </p>
            {projectTitle && (
              <h5 className="text-center text-yellow drop-shadow-black_sm pt-2">
                {projectTitle}
              </h5>
            )}
          </div>
          <p className="text-center col-span-full text-white mt-auto">
            {description}
          </p>
        </div>

        <div className="flex flex-col justify-center gap-12">
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
        <div className="col-span-6 col-start-4 absolute -bottom-40 w-2/3 left-1/2 -translate-x-1/2">
          <AnimateInOnScroll direction={DirectionEnum.Up}>
            <QuoteBox quote={clientQuote} clientQuoteName={clientQuoteName} />
          </AnimateInOnScroll>
        </div>
      </div>
    </section>
  );
};

export default ProjectFeature;
