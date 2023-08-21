import Icon from '@atoms/Icon/Icon';
import { SbImage } from '@atoms/SbImage/SbImage';
import IAsset from '@models/IAsset';
import ILinkList from '@models/ILinkList';
import ISbURL from '@models/ISbURL';
import { SbBlokData, storyblokEditable } from '@storyblok/react';

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
        <div className="lg:col-span-8 lg:col-start-2">
          {linkLists.map((linkList) => (
            <div className="flex flex-col gap-4 items-center text-center xl:items-start xl:text-left">
              <div key={linkList._uid} className="body-two text-yellow">
                {linkList.title}
              </div>
              <ul className="flex flex-col gap-4">
                {linkList.links.map((link) => (
                  <li key={link._uid}>
                    <a href={link.url.url}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="lg:col-start-10 lg:col-span-2 h-full flex flex-col justify-between pt-12 lg:pt-0 px-20 lg:px-0">
          <SbImage className="w-full" src={logo.filename} alt={logo.alt} />
          <div className="w-full flex justify-between pl-8 pr-4 pt-6 lg:pt-0 mt-auto">
            <a href={linkedInLink?.url}>
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
