import { IPageMetadata } from './page-meta.interface';

export interface IPagination<T> {
  data: Array<T>;
  pagination: IPageMetadata;
}
