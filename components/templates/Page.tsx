import {
  storyblokEditable,
  StoryblokComponent,
  SbBlokData,
} from '@storyblok/react';

interface IPage extends SbBlokData {
  readonly metaDescription: string;
  readonly title: string;
}

const Page = ({ blok }: { blok: IPage }) => (
  <main
    {...storyblokEditable(blok)}
    className="flex flex-col items-center min-h-screen overflow-x-clip"
  >
    {(blok.body as SbBlokData[]).map((nestedBlok) => (
      <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default Page;
