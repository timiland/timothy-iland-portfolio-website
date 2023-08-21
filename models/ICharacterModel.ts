import IAsset from './IAsset';

export default interface ICharacterModel {
  readonly name: string;
  readonly tagline: string;
  readonly thumbnail: IAsset;
  readonly model: IAsset;
}
