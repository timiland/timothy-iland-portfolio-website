import { SbImage } from '@atoms/SbImage/SbImage';
import IProject from '@models/IProject';
import ISiteConfig from '@models/ISiteConfig';
import { useConfig } from '@stores/configProvider';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import Accordion from 'components/molecules/Accordion/Accordion';
import dynamic from 'next/dynamic';
import QuoteBox from 'components/molecules/QuoteBox/QuoteBox';
import Masonry from 'react-masonry-css';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const Project = ({ blok: project }: { blok: IProject }) => {
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

  return (
    <main
      {...storyblokEditable(project)}
      className="flex flex-col items-center min-h-screen overflow-x-clip"
    >
      <section
        className="relative w-full grid-container component-padding gap-y-40"
        {...storyblokEditable(project)}
      >
        <div className="xl:col-start-2 xl:col-span-10 flex flex-col gap-6 p-12 rounded-3xl bg-green-600">
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
                    {briefLabel}:
                  </p>
                )}
                {brief && <p className="text-[16px] pt-8 pb-6">{brief}</p>}
              </div>
            </>
          )}
          {heroVideo.filename ? (
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
          ) : (
            <SbImage
              className="rounded-3xl shadow-bold"
              key={heroImage.alt}
              alt={heroImage.alt}
              sizes="(max-width: 400px) 480px, 100vw"
              src={heroImage.filename}
            />
          )}
        </div>
        <div className="xl:col-start-2 xl:col-span-10 flex flex-col gap-20">
          {!!keyFeatures.length && (
            <Accordion
              embedded
              blok={{ title: keyFeaturesLabel, items: keyFeatures }}
            />
          )}
        </div>
        {heroVideo.filename && heroImage.filename && (
          <div className="relative col-span-full lg:grid lg:grid-cols-2 xl:grid-cols-12 xl:gap-x-8 gap-x-6">
            <SbImage
              className="rounded-3xl shadow-bold xl:col-start-2 gap-24 xl:col-span-8 w-full"
              key={heroImage.alt}
              alt={heroImage.alt}
              sizes="(max-width: 400px) 480px, 100vw"
              src={heroImage.filename}
            />
            <div className="absolute w-1/2 -bottom-10 right-32">
              {clientQuote && (
                <QuoteBox
                  clientQuoteName={clientQuoteName}
                  quote={clientQuote}
                />
              )}
            </div>
          </div>
        )}
        <Masonry
          breakpointCols={{
            default: 2,
            1100: 2,
            500: 1,
          }}
          className="my-masonry-grid col-span-full"
          columnClassName="my-masonry-grid_column"
        >
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group overflow-clip rounded-3xl"
            >
              <SbImage
                className="w-full rounded-3xl shadow-bold"
                key={image.alt}
                alt={image.alt}
                // sizes="(max-width: 400px) 480px, 600px"
                src={image.filename}
              />
              {image.title && (
                <div className="left-10 bottom-10 border-2 border-yellow bg-black rounded-3xl absolute translate-y-[200px] duration-300 p-4 shadow-bold group-hover:translate-y-0 transition-all">
                  {image.title}
                </div>
              )}
            </div>
          ))}
        </Masonry>
      </section>
      {additionalComponents.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default Project;
