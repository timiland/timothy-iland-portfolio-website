import Button from '@atoms/Button/Button';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import ITextBlock from '@models/ITextBlock';
import {
  renderRichText,
  SbBlokData,
  storyblokEditable,
} from '@storyblok/react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

export interface IAccordionItem extends SbBlokData {
  readonly isActive: boolean;
  readonly setActiveIndex: (index: number) => void;
  readonly textBlock: ITextBlock;
  readonly index: number;
}

const AccordionItem = ({ textBlock, index, setActiveIndex, isActive }) => {
  const { text, title } = textBlock;
  return (
    <div {...storyblokEditable(textBlock)}>
      <Button
        iconName="sort-desc"
        iconFlip={isActive}
        style_={ButtonStyleEnum.Outline}
        onClick={() => setActiveIndex(isActive ? null : index)}
      >
        {title}
      </Button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div
              className="pt-8 px-4 body-two text-white"
              {...storyblokEditable(textBlock)}
              dangerouslySetInnerHTML={{
                __html: renderRichText(text),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
