import Button from '@atoms/Button/Button';
import { SbImage } from '@atoms/SbImage/SbImage';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import IProduct from '@models/IProduct';
import ISiteConfig from '@models/ISiteConfig';
import { useConfig } from '@stores/configProvider';
import { storyblokEditable, StoryblokComponent } from '@storyblok/react';
import Accordion from 'components/molecules/Accordion/Accordion';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

const Product = ({ blok: product }: { blok: IProduct }) => {
  const { labels } = useConfig() as ISiteConfig;

  const { clientLabel, projectLabel, keyFeaturesLabel, briefLabel } = labels;

  const { additionalComponents, name, images, description } = product;

  return (
    <main
      {...storyblokEditable(product)}
      className="flex flex-col items-center min-h-screen overflow-x-clip"
    >
      <section
        className="relative w-full grid-container component-padding gap-y-40"
        {...storyblokEditable(product)}
      >
        <div className="col-start-2 col-span-5 gap-10 flex flex-col">
          {images.map((image) => (
            <SbImage
              key={image.id}
              className="w-full rounded-xl shadow-bold h-[500px] object-contain bg-white p-12"
              alt={image.alt}
              // sizes="(max-width: 400px) 480px, 600px"
              src={image.filename}
            />
          ))}
        </div>
        <div className="col-start-8 col-span-4 relative">
          <div className="bg-green-600 rounded-xl p-12 sticky top-[200px] flex flex-col gap-6 items-start">
            <h5 className="w-full col-start-2 col-span-full text-yellow drop-shadow-black_lg whitespace-pre-line">
              {name}
            </h5>
            <div>
              <p className="h4">£9.99</p>
              <p className="small-copy">+£2 shipping inside UK</p>
            </div>
            <p>{description}</p>

            <Button style_={ButtonStyleEnum.Outline}>Buy Now</Button>
          </div>
        </div>
      </section>
      {additionalComponents.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
};

export default Product;
