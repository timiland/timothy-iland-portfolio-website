import {
  ISbRichtext,
  renderRichText,
  SbBlokData,
  storyblokEditable,
} from '@storyblok/react';
import IAsset from '@models/IAsset';
import DirectionEnum from '@models/enums/DirectionEnum';
import { SbImage } from '@atoms/SbImage/SbImage';
import clsx from 'clsx';
import ILink from '@models/ILink';
import Button from '@atoms/Button/Button';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';

export interface ISideImageSection extends SbBlokData {
  readonly title: string;
  readonly text: ISbRichtext;
  readonly image: IAsset;
  readonly imagePosition: DirectionEnum;
  readonly links: ILink[];
}

const SideImageSection = ({ blok }: { blok: ISideImageSection }) => {
  const { title, text, image, imagePosition, links } = blok;

  return (
    <section
      className="relative w-full grid-container items-center gap-y-12 component-padding"
      {...storyblokEditable(blok)}
    >
      <div
        className={clsx(
          imagePosition === DirectionEnum.Left
            ? 'xl:col-start-2'
            : 'xl:col-start-7 xl:order-2',
          'xl:col-span-5 relative drop-shadow-xl'
        )}
      >
        <SbImage
          className="xl:max-h-[600px] object-contain w-full"
          alt={image.alt}
          src={image.filename}
          sizes={`
            (max-width: 768px) 376px,
            (max-width: 1024px) 800px,
            1200px`}
        />
      </div>
      <div
        className={clsx(
          imagePosition === DirectionEnum.Left
            ? 'xl:col-start-8 xl:order-1'
            : 'xl:col-start-2',
          'xl:col-span-4 text-center flex flex-col items-center justify-center gap-14'
        )}
      >
        <h2 className="whitespace-pre-line text-yellow drop-shadow-black_lg">
          {title}
        </h2>
        <div
          className="body-lg"
          dangerouslySetInnerHTML={{ __html: renderRichText(text) }}
        />
      </div>

      <div className="col-span-full flex flex-wrap gap-24 items-center justify-center order-2">
        {links?.map((link) => (
          <Button
            key={link.title}
            href={link.url.cached_url}
            className="shadow-bold"
            style_={ButtonStyleEnum.Outline}
          >
            {link.title}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default SideImageSection;
