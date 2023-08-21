import IconSizeEnum from './enums/IconSizeEnum';

export type IconName = 'arrow_drop_down' | string;

export interface IIcon {
  readonly className?: string;
  readonly color?: string;
  readonly colorClassName?: string;
  readonly name: IconName;
  readonly size?: IconSizeEnum | number | string;
}
