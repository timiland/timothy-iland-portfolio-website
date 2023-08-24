/* eslint-disable camelcase */
import '../styles/index.scss';
import { storyblokInit, apiPlugin } from '@storyblok/react';
import { Poppins } from 'next/font/google';
import BulletSection from '@organisms/BulletSection/BulletSection';
import CtaPopOutSection from '@organisms/CtaPopOutSection/CtaPopOutSection';
import ProjectFeature from '@organisms/ProjectFeature/ProjectFeature';
import PopOutTextHero from '@organisms/PopOutTextHero/PopOutTextHero';
import Footer from '@organisms/Footer/Footer';
import ContactFormSection from '@organisms/ContactFormSection/ContactFormSection';
import BasicHero from '@organisms/BasicHero/BasicHero';
import Project from '@templates/Project';
import Accordion from 'components/molecules/Accordion/Accordion';
import TextHightlightSection from '@organisms/TextHightlightSection/TextHightlightSection';
import MasonryGallery from '@organisms/MasonryGallery/MasonryGallery';
import dynamic from 'next/dynamic';
import NavBar from '../components/organisms/Navbar/NavBar';
import Page from '../components/templates/Page';
import SideImageSection from '../components/organisms/SideImageSection/SideImageSection';

const CharacterAnimationHero = dynamic(
  () => import('@organisms/CharacterAnimationHero/CharacterAnimationHero'),
  {
    ssr: false,
  }
);

const poppins = Poppins({
  weight: ['200', '300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const components = {
  bulletSection: BulletSection,
  basicHero: BasicHero,
  characterAnimationHero: CharacterAnimationHero,
  contactFormSection: ContactFormSection,
  ctaPopOutSection: CtaPopOutSection,
  masonryGallery: MasonryGallery,
  footer: Footer,
  navBar: NavBar,
  page: Page,
  accordion: Accordion,
  project: Project,
  popOutTextHero: PopOutTextHero,
  projectFeature: ProjectFeature,
  sideImageSection: SideImageSection,
  textHighlightSection: TextHightlightSection,
};

storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  components,
});

// get correct typing on this
function MyApp({ Component, pageProps }: any) {
  return (
    <div className={`${poppins.variable} font-poppins bg-green text-white`}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
