import { SbBlokData, storyblokEditable } from '@storyblok/react';

export interface IFramedImage extends SbBlokData {
  // ~~readonly props here~~
}

const FramedImage = ({ blok } : { blok : IFramedImage }) => (
  <section className="w-full grid-container component-padding" {...storyblokEditable(blok)} >
    {/* ~~Component content here - remove classes above as necessary~~ */}
  </section>
);

export default FramedImage;
