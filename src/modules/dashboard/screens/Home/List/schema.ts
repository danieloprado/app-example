import { SupportedIcons } from '@app/shared/components/Icon';
import { PaginationRequest, PaginationResponse } from '@app/shared/schemas/pagination';

export type ListResponseItem = {
  id: number;
  name: string;
  icon: SupportedIcons;
};

export interface ListRequest extends PaginationRequest {}
export interface ListResponse extends PaginationResponse<ListResponseItem> {}
