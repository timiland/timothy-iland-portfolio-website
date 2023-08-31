import {
  ISbRichtext,
  renderRichText,
  SbBlokData,
  storyblokEditable,
} from '@storyblok/react';

export interface IBasicHero extends SbBlokData {
  readonly title: string;
  readonly text: ISbRichtext;
}

const BasicHero = ({ blok }: { blok: IBasicHero }) => {
  const { title, text } = blok;

  return (
    <section
      className="w-full grid-container component-padding gap-y-24"
      {...storyblokEditable(blok)}
    >
      <h1 className="col-span-full xl:col-span-8 xl:col-start-3 text-center text-yellow drop-shadow-black_lg">
        {title}
      </h1>

      {text && (
        <div
          className="col-span-full xl:col-span-8 xl:col-start-3 text-center body"
          dangerouslySetInnerHTML={{
            __html: renderRichText(text),
          }}
        />
      )}
    </section>
  );
};
export default BasicHero;
