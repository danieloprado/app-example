import * as yup from 'yup';

import { SupportedIcons } from '@/modules/Shared/components/Icon';
import { PaginationRequest, PaginationResponse } from '@/modules/Shared/schemas/pagination';

export type ListResponseItem = {
  id: number;
  name: string;
  icon: SupportedIcons;
};

export interface ListRequest extends PaginationRequest<ListResponseItem, never, unknown> {}
export interface ListResponse extends PaginationResponse<ListResponseItem> {}

export const listSchema: yup.Schema<ListRequest> = yup.object({
  page: yup.number().min(1).required(),
  perPage: yup.number().min(5).required()
});
