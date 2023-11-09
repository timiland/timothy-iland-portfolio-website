import { SbBlokData } from '@storyblok/react';
import IAsset from './IAsset';

export default interface IProduct extends SbBlokData {
  readonly additionalComponents: SbBlokData[];
  readonly description: string;
  readonly images: IAsset[];
  readonly name: string;
}
