import ILink from '@models/ILink';

export default function isLink(
  link: ILink | { links: ILink[] }
): link is ILink {
  return (link as ILink).url !== undefined;
}
