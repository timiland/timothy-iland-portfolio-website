import { SbBlokData } from '@storyblok/react';
import IAsset from './IAsset';
import ISbURL from './ISbURL';
import ITextBlock from './ITextBlock';

export default interface IProject extends SbBlokData {
  readonly additionalComponents: SbBlokData[];
  readonly personalProject: boolean;
  readonly brief: string;
  readonly client: string;
  readonly clientQuote: string;
  readonly clientQuoteName: string;
  readonly description: string;
  readonly heroImage: IAsset;
  readonly heroVideo: IAsset;
  readonly images: IAsset[];
  readonly keyFeatures: ITextBlock[];
  readonly projectTitle: string;
  readonly websiteUrl: ISbURL;
}
