import { SbImage } from '@atoms/SbImage/SbImage';
import IAsset from '@models/IAsset';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import Masonry from 'react-masonry-css';

export interface IMasonryGallery extends SbBlokData {
  readonly images: IAsset[];
}

const MasonryGallery = ({ blok }: { blok: IMasonryGallery }) => {
  const { images } = blok;

  return (
    <section
      className="w-full grid-container component-padding"
      {...storyblokEditable(blok)}
    >
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
          <div className="bg-gradient-to-b from-black-100 to-black p-3 border-yellow shadow-bold border-2 rounded-3xl overflow-clip">
            <SbImage
              className="w-full h-full drop-shadow-md bg-white rounded-2xl overflow-clip"
              src={image.filename}
              alt={image.alt}
            />
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default MasonryGallery;
