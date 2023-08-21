import { FC } from 'react';
import {
  storyblokEditable,
  // StoryblokComponent,
  SbBlokData,
} from '@storyblok/react';

export interface IThreeImageFeature {
  readonly blok: SbBlokData;
}

const ThreeImageFeature: FC<IThreeImageFeature> = ({ blok }) => (
  <div className="grid" {...storyblokEditable(blok)}>
    {/* {blok?.columns?.map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))} */}
  </div>
);

export default ThreeImageFeature;
