import { SbBlokData } from '@storyblok/react';
import IAsset from './IAsset';
import ITextBlock from './ITextBlock';

export default interface IProject extends SbBlokData {
  readonly projectTitle: string;
  readonly description: string;
  readonly heroImage: IAsset;
  readonly heroVideo: IAsset;
  readonly client: string;
  readonly clientQuoteName: string;
  readonly clientQuote: string;
  readonly images: IAsset[];
  readonly additionalComponents: SbBlokData[];
  readonly keyFeatures: ITextBlock[];
}
