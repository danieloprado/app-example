import { SupportedIcons } from '@/modules/Shared/components/Icon';
import { PaginationRequest, PaginationResponse } from '@/modules/Shared/schemas/pagination';

export type ListResponseItem = {
  id: number;
  name: string;
  icon: SupportedIcons;
};

export interface ListRequest extends PaginationRequest {}
export interface ListResponse extends PaginationResponse<ListResponseItem> {}
