import { SbBlokData } from '@storyblok/react';

export default interface ILabel extends SbBlokData {
  readonly key: string;
  readonly text: string;
}
