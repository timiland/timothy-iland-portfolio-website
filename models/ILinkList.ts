import { SbBlokData } from '@storyblok/react';
import ILink from './ILink';

export default interface ILinkList extends SbBlokData {
  readonly title: string;
  readonly links: ILink[];
}
