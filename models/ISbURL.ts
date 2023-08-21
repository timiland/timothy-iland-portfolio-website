export default interface ISbURL {
  readonly id: string;
  readonly url: string;
  readonly target: string;
  readonly linktype: string;
  readonly fieldtype: string;
  readonly cached_url: string;
}
