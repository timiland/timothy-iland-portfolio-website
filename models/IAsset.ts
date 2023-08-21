export default interface IAsset {
  readonly alt: string;
  readonly copyright: string;
  readonly fieldtype: string;
  readonly filename: string;
  readonly focus: string;
  readonly id: number;
  readonly is_external_url: boolean;
  readonly name?: string;
  readonly title: string;
}

export type AssetModel = {
  alt: string;
  src: string;
  copyright?: string;
  focus?: string; // {left}x{top}:{right}x{bottom} e.g. 1423x936:1424x937
  height?: number;
  ratio?: number;
  ratioPercent?: number;
  title?: string;
  width?: number;
};
