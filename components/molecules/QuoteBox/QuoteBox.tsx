import Icon from '@atoms/Icon/Icon';
import clsx from 'clsx';

export interface IQuoteBox {
  readonly quote: string;
  readonly clientQuoteName: string;
  readonly className?: string;
}

const QuoteBox = ({ quote, clientQuoteName, className }: IQuoteBox) => (
  <div
    className={clsx(
      className,
      'flex gap-6 bg-black p-8 border-2 shadow-bold rounded-3xl border-yellow'
    )}
  >
    <Icon name="quotes-right-alt" className="shrink-0 text-yellow" />
    <div>
      <p className="pb-4 pt-2 text-justify">{quote}</p>
      <h4 className="body">{clientQuoteName}</h4>
    </div>
    <Icon
      name="quotes-left-alt"
      className="text-yellow shrink-0 mt-auto mb-8"
    />
  </div>
);

export default QuoteBox;
