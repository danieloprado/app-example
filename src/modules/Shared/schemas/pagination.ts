export const paginationSort = ['asc', 'desc'] as const;
export type PaginationSortType = (typeof paginationSort)[number];

export interface PaginationRequest<M, O extends keyof M | `${string}.${string}` = never, F = never> {
  page: number;
  perPage: number;
  sortField?: O;
  sortDirection?: PaginationSortType;
  filters?: F | undefined | null;
}

export interface PaginationResponse<T> {
  total?: number;
  result: T[];
}
