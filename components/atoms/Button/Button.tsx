import Icon from '@atoms/Icon/Icon';
import ButtonStyleEnum from '@models/enums/ButtonStyleEnum';
import ColoursEnum from '@models/enums/ColoursEnum';
import IconSizeEnum from '@models/enums/IconSizeEnum';
import clsx from 'clsx';
import Link from 'next/link';
import { ButtonHTMLAttributes } from 'react';
import ILink from '../../../models/ILink';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly secondary?: boolean;
  readonly download?: boolean;
  readonly style_?: ButtonStyleEnum;
  readonly link?: ILink;
  readonly target?: string;
  readonly href?: string;
  readonly iconName?: string;
  readonly iconFlip?: boolean;
  readonly mainColour?: ColoursEnum;
  readonly linkCallback?: () => void;
}

const Button = ({
  style_ = ButtonStyleEnum.Default,
  children,
  href = '',
  target = '',
  download,
  secondary,
  iconName = '',
  iconFlip = false,
  linkCallback,
  ...buttonProps
}: IButton) => {
  const { className, disabled } = buttonProps;

  const textStyles = clsx({
    'text-white hover:text-yellow focus:text-yellow active:text-yellow':
      !disabled &&
      !secondary &&
      (style_ === ButtonStyleEnum.Basic || ButtonStyleEnum.Outline),

    'text-black':
      !disabled &&
      secondary &&
      (style_ === ButtonStyleEnum.Basic || ButtonStyleEnum.Outline),

    'text-gray-200':
      disabled && (style_ === ButtonStyleEnum.Basic || ButtonStyleEnum.Outline),
  });

  const boxStyles = clsx({
    'bg-black border-2 border-yellow':
      !disabled && !secondary && style_ === ButtonStyleEnum.Outline,

    'bg-white border-2 border-black hover:bg-yellow focus:bg-yellow active:bg-yellow':
      !disabled && secondary && style_ === ButtonStyleEnum.Outline,

    'bg-black-300': disabled && style_ === ButtonStyleEnum.Outline,

    'rounded-full': style_ === ButtonStyleEnum.Outline,
  });

  const iconClasses = clsx(
    iconFlip && '-scale-y-100',
    'ml-2 -translate-y-[2px]'
  );

  const buttonClasses = clsx(
    textStyles,
    boxStyles,
    'inline-block py-2 px-4 min-h-min select-none cta transition-all ease-in',
    className
  );

  return href && children && !disabled ? (
    <Link
      className={buttonClasses}
      href={href}
      target={target}
      onClick={() => linkCallback?.()}
      download={download}
    >
      {children}
      <Icon name={iconName} size={IconSizeEnum.lg} className={iconClasses} />
    </Link>
  ) : (
    <button
      tabIndex={0}
      {...buttonProps}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
      <Icon name={iconName} size={IconSizeEnum.lg} className={iconClasses} />
    </button>
  );
};

Button.defaultProps = {
  link: {
    name: '',
    url: '',
    target: '',
    linkIcon: '',
  },
  secondary: false,
  linkCallback: () => null,
};

export default Button;
