import ITextBlock from '@models/ITextBlock';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import TextHighlight from 'components/molecules/TextHighlight/TextHighlight';

export interface ITextHightlightSection extends SbBlokData {
  readonly title: string;
  readonly highlights: ITextBlock[];
}

const TextHightlightSection = ({ blok }: { blok: ITextHightlightSection }) => {
  const { title, highlights } = blok;

  return (
    <section
      className="w-full grid-container gap-y-24 component-padding"
      {...storyblokEditable(blok)}
    >
      <h1 className="text-yellow drop-shadow-black_lg col-span-full text-center">
        {title}
      </h1>
      <ul className="xl:col-start-3 xl:col-span-8 flex flex-col gap-12">
        {highlights.map((highlight) => (
          <TextHighlight {...highlight} />
        ))}
      </ul>
    </section>
  );
};

export default TextHightlightSection;
