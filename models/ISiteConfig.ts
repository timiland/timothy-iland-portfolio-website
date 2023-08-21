import { IContactForm } from '@organisms/ContactForm/ContactForm';
import { IFooter } from '@organisms/Footer/Footer';
import { SbBlokData } from '@storyblok/react';
import { INavBar } from './INavBar';

export default interface ISiteConfig extends SbBlokData {
  readonly labels: Record<string, string>;
  readonly navBar: INavBar;
  readonly footer: IFooter;
  readonly contactForm: IContactForm;
}
