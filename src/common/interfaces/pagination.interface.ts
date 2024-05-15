import { IPageMetadata } from './page-meta.interface';

export interface IPagination<T> {
  result: Array<T>;
  pagination: IPageMetadata;
}
