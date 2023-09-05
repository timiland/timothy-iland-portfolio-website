import ITextBlock from '@models/ITextBlock';
import { renderRichText } from '@storyblok/react';

const TextHighlight = ({ title, text }: ITextBlock) => (
  <div className="flex flex-col gap-12">
    {title && <h4 className="text-yellow drop-shadow-black_lg">{title}</h4>}

    <div
      className="xl:pl-12 text-white rich-text-area"
      dangerouslySetInnerHTML={{
        __html: renderRichText(text),
      }}
    />
  </div>
);

export default TextHighlight;
