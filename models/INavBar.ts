import { SbBlokData } from '@storyblok/react';
import IAsset from './IAsset';
import ILink from './ILink';
import ILinkList from './ILinkList';

export interface INavBar extends SbBlokData {
  readonly logo: IAsset;
  readonly linkArray: (ILink | ILinkList)[];
  readonly contactCta: string;
}
