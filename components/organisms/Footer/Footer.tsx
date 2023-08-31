import Icon from '@atoms/Icon/Icon';
import { SbImage } from '@atoms/SbImage/SbImage';
import IAsset from '@models/IAsset';
import ILinkList from '@models/ILinkList';
import ISbURL from '@models/ISbURL';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import Link from 'next/link';

export interface IFooter extends SbBlokData {
  readonly logo: IAsset;
  readonly linkLists: ILinkList[];
  readonly copyrightText: string;
  readonly instagramLink: ISbURL;
  readonly linkedInLink: ISbURL;
  readonly email: ISbURL;
}

const Footer = ({ blok }: { blok: IFooter }) => {
  const { logo, linkLists, copyrightText, instagramLink, linkedInLink, email } =
    blok;
  return (
    <footer
      {...storyblokEditable(blok)}
      className="bg-black text-white relative z-10 pt-12 border-yellow border-t-2"
    >
      <div className="grid-container gap-y-12">
        <div className="md:col-start-1 xl:col-span-8 xl:col-start-2">
          {linkLists.map((linkList) => (
            <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left">
              <div key={linkList._uid} className="body text-yellow">
                {linkList.title}
              </div>
              <ul className="flex flex-col gap-4">
                {linkList.links.map((link) => (
                  <Link
                    key={link._uid}
                    className="hover:underline underline-offset-2 decoration-1"
                    target={link.target}
                    href={link?.url?.url || `/${link.url.cached_url}`}
                    as={`/${link.url.cached_url}`}
                  >
                    {link.title}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="xl:col-start-10 md:col-start-2 xl:col-span-2 h-full flex flex-col items-center lg:items-end xl:pt-0 px-20 md:px-0 xl:px-0">
          <SbImage
            className="w-2/3 xl:w-full"
            src={logo.filename}
            alt={logo.alt}
          />
          <div className="w-full flex justify-between lg:justify-end gap-10 md:px-12 px-8 lg:px-8 xl:px-0 pt-6 mt-auto">
            <a href={`mailto:${email?.url}`}>
              <Icon
                name="envelope-o"
                className="text-white hover:text-yellow"
              />
            </a>
            <a href={instagramLink?.url}>
              <Icon name="instagram" className="text-white hover:text-yellow" />
            </a>
            <a href={linkedInLink?.url}>
              <Icon name="linkedin" className="text-white hover:text-yellow" />
            </a>
          </div>
        </div>
      </div>
      <div className="col-span-full bg-black-100 text-white p-2 mt-12 small-copy text-center">
        {copyrightText}
      </div>
    </footer>
  );
};

export default Footer;
