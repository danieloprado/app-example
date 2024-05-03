export const paginationSort = ['asc', 'desc'] as const;
export type PaginationSortType = (typeof paginationSort)[number];

export interface PaginationRequest {
  page: number;
  pageSize: number;
}

export interface PaginationResponse<T> {
  total: number;
  result: T[];
}
