import AccordionItem from '@atoms/AccordionItem/AccordionItem';
import ITextBlock from '@models/ITextBlock';
import { SbBlokData, storyblokEditable } from '@storyblok/react';
import clsx from 'clsx';
import { useState } from 'react';

export interface IAccordion extends SbBlokData {
  readonly title?: string;
  readonly items: ITextBlock[];
}

const Accordion = ({
  embedded = false,
  blok,
}: {
  embedded?: boolean;
  blok: IAccordion;
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { items, title } = blok;

  return (
    <section
      className={clsx(
        !embedded && 'component-padding',
        'grid-container gap-y-12'
      )}
      {...storyblokEditable(blok)}
    >
      <div
        className={clsx(
          embedded ? 'xl:col-span-full' : 'xl:col-start-2 xl:col-span-10',
          'grid grid-cols-1 gap-10 xl:grid-cols-2 xl:col-start-1 shadow-bold bg-black text-white p-8 pb-12 rounded-3xl relative z-10 border-yellow border-2'
        )}
      >
        {title && <h3 className="w-full col-span-full">{title}</h3>}
        {items.map((item, index) => (
          <AccordionItem
            key={item.title}
            setActiveIndex={setActiveIndex}
            index={index}
            isActive={activeIndex === index}
            textBlock={item}
          />
        ))}
      </div>
    </section>
  );
};

export default Accordion;
