import { ISbRichtext, SbBlokData } from '@storyblok/react';

export default interface ITextBlock extends SbBlokData {
  readonly title?: string;
  readonly text: ISbRichtext;
}
