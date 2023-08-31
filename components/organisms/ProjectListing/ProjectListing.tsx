import Button from '@atoms/Button/Button';
import { SbImage } from '@atoms/SbImage/SbImage';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import IProject from '@models/IProject';
import ISiteConfig from '@models/ISiteConfig';
import { useConfig } from '@stores/configProvider';
import { ISbStoryData, SbBlokData, storyblokEditable } from '@storyblok/react';

export interface IProjectListing extends SbBlokData {
  readonly title: string;
  readonly text: string;
  readonly projects: ISbStoryData[];
}

const ProjectListing = ({ blok }: { blok: IProjectListing }) => {
  const { title, text, projects } = blok;

  const { labels } = useConfig() as ISiteConfig;

  const { readMoreLabel, viewWebsiteLabel } = labels;

  return (
    <section
      className="w-full grid-container gap-y-12 component-padding"
      {...storyblokEditable(blok)}
    >
      {title && (
        <h1 className="col-span-full xl:col-span-8 xl:col-start-3 text-center text-yellow drop-shadow-black_lg">
          {title}
        </h1>
      )}

      {text && (
        <div className="col-span-full xl:col-span-8 xl:col-start-3 text-center body-lg py-6">
          {text}
        </div>
      )}
      {projects.map((project) => {
        const { heroImage, description, client, projectTitle, websiteUrl } =
          project.content as IProject;

        return (
          <div
            key={project.uuid}
            className="col-span-6 p-6 gap-6 lg:p-12 flex lg:gap-12 flex-col justify-start bg-green-550 rounded-3xl shadow-md"
          >
            <div>
              <h5 className="text-yellow drop-shadow-black_sm">
                {projectTitle}
              </h5>
              <div className="body-sm pt-2">{client}</div>
            </div>
            <div className="frame bg-black p-4">
              <SbImage
                className="w-full drop-shadow-md  rounded-xl"
                sizes="(max-width: 768px) 2000px, 2000px"
                ratio={0.6}
                src={heroImage.filename}
                alt={heroImage.alt}
              />
            </div>
            {description && <div>{description}</div>}
            <div className="flex flex-col lg:flex-row gap-6 mt-auto items-start justify-start">
              {project?.path && (
                <Button style_={ButtonStyleEnum.Outline} href={project.path}>
                  {readMoreLabel}
                </Button>
              )}
              {websiteUrl?.url && (
                <Button style_={ButtonStyleEnum.Outline} href={websiteUrl.url}>
                  {viewWebsiteLabel}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ProjectListing;
