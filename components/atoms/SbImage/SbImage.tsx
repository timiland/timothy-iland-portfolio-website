/* eslint-disable react/no-unknown-property */
import { AssetModel } from '@models/IAsset';
import { SbBlokData } from '@storyblok/react';

export type IImage = SbBlokData;

export const IMAGE_WIDTHS = [
  400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800,
  3000, 3200,
];

export type SrcSetItem = [src: string, descriptor: string];
export type SrcSetList = SrcSetItem[];

export type ImageProps = AssetModel & {
  className?: string;
  loading?: 'eager' | 'lazy';
  sizes?: string;
};

export function getImageSrc(
  input: string,
  width: number,
  ratio: number,
  focus?: string
): string {
  const height = ratio === 0 ? 0 : Math.round(width * ratio);

  let focalFilter = focus || 'smart';

  if (focalFilter && focalFilter !== 'smart') {
    focalFilter = `filters:focal(${focus})`;
  }

  return `${input}/m/${width}x${height}/${focalFilter}`;
}

export function getImageSrcSet(
  input: string,
  widths: number[],
  ratio: number,
  focus?: string
): SrcSetList {
  return widths.map((width) => [
    getImageSrc(input, width, ratio, focus),
    `${width}w`,
  ]);
}

export function formatImageSrc(input: SrcSetList): string {
  return input.map((item) => item.join(' ')).join(',');
}

export const SbImage = ({
  alt,
  className,
  focus,
  loading = 'lazy',
  ratio,
  sizes,
  src,
  title,
}: ImageProps) => {
  const srcSet = getImageSrcSet(src, IMAGE_WIDTHS, ratio ?? 0, focus);

  return src.includes('.svg') ? (
    <img className={className} src={src} alt={alt} loading={loading} />
  ) : (
    <img
      className={className}
      alt={alt}
      decoding={loading === 'lazy' ? 'async' : 'sync'}
      fetchPriority={loading === 'lazy' ? undefined : 'high'}
      loading={loading}
      sizes={sizes}
      src={srcSet[0][0]}
      srcSet={formatImageSrc(srcSet)}
      title={title}
    />
  );
};
