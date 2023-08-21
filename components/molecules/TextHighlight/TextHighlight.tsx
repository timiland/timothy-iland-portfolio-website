import ITextBlock from '@models/ITextBlock';
import { renderRichText } from '@storyblok/react';

const TextHighlight = ({ title, text }: ITextBlock) => (
  <div className="flex flex-col gap-12">
    {title && <h3 className="text-yellow drop-shadow-black_lg">{title}</h3>}

    <div
      className="pl-12 body-one text-white"
      dangerouslySetInnerHTML={{
        __html: renderRichText(text),
      }}
    />
  </div>
);

export default TextHighlight;
