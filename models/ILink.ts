import { SbBlokData } from '@storyblok/react';
import TargetEnum from './enums/targetEnum';
import ISbURL from './ISbURL';

export default interface ILink extends SbBlokData {
  readonly url: ISbURL;
  readonly title: string;
  readonly target?: TargetEnum;
}
