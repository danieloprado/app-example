import * as yup from 'yup';

import {
  PaginationRequest,
  PaginationResponse,
  PaginationSortType,
  paginationSort
} from '@/modules/Shared/schemas/pagination';

export const seizureRequestListSort = ['licensePlate', 'chassi', 'renavam', 'createdAt'] as const;
export type SeizureRequestListSort = (typeof seizureRequestListSort)[number];

export type SeizureRequestListResponseItem = {
  id: number;
  licensePlate: string;
  chassi: string;
  reward: string;
  model: string;
  maker: string;
  year: string;
  createdAt: string;
  renavam: string;
  category: string;
  lawCompanyName: string;
};

export type SeizureRequestListFilter = {
  term?: string;
};

export interface SeizureRequestListRequest
  extends PaginationRequest<SeizureRequestListResponseItem, SeizureRequestListSort, unknown> {
  filters: SeizureRequestListFilter;
}

export interface SeizureRequestListResponse extends PaginationResponse<SeizureRequestListResponseItem> {}

export const seizureRequestListFilterSchema = yup.object({
  term: yup
    .string()
    .min(3)
    .transform(value => (!value ? undefined : value))
});

export const seizureRequestListSchema: yup.Schema<SeizureRequestListRequest> = yup.object({
  page: yup.number().min(1).required(),
  perPage: yup.number().min(5).required(),
  sortField: yup.mixed<SeizureRequestListSort>().oneOf(seizureRequestListSort),
  sortDirection: yup.mixed<PaginationSortType>().oneOf(paginationSort),
  filters: seizureRequestListFilterSchema.required()
});
