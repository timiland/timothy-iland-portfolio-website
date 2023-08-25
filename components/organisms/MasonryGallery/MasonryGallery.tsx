import Frame from '@atoms/Frame/Frame';
import { SbImage } from '@atoms/SbImage/SbImage';
import IAsset from '@models/IAsset';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import Masonry from 'react-masonry-css';

export interface IMasonryGallery extends SbBlokData {
  readonly title: string;
  readonly images: IAsset[];
}

const MasonryGallery = ({ blok }: { blok: IMasonryGallery }) => {
  const { images, title } = blok;

  return (
    <section
      className="w-full grid-container gap-y-12 component-padding"
      {...storyblokEditable(blok)}
    >
      {title && (
        <h3 className="col-span-full text-yellow drop-shadow-black_lg">
          {title}
        </h3>
      )}
      <Masonry
        breakpointCols={{
          default: 3,
          1100: 2,
          500: 1,
        }}
        className="my-masonry-grid col-span-full"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => (
          <Frame>
            <SbImage
              className="w-full h-full drop-shadow-md bg-white rounded-2xl overflow-clip"
              src={image.filename}
              alt={image.alt}
            />
          </Frame>
        ))}
      </Masonry>
    </section>
  );
};

export default MasonryGallery;
