import { useRef, useState, useEffect, useCallback } from 'react';

import {
  InfiniteData,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQueryClient
} from '@tanstack/react-query';
import { shallowEqualObjects } from 'shallow-equal';

export interface PaginationParams {
  [key: string]: any;
  pageSize: number;
}

export interface PaginationResponse<T = unknown> {
  total: number;
  result: T[];
}

export type PaginationMergeParams<P> = Partial<P> | ((currenteParams: Partial<P>) => Partial<P>);

export interface UseQueryPaginatedOptions<P extends PaginationParams, R = unknown>
  extends Omit<
    UseInfiniteQueryOptions<
      PaginationResponse<R>,
      Error,
      PaginationResponse<R>,
      PaginationResponse<R>,
      string[],
      number
    >,
    'queryFn' | 'getNextPageParam' | 'initialPageParam' | 'getPreviousPageParam'
  > {
  initialParams?: Partial<P>;
  queryFn: (params: P) => Promise<PaginationResponse<R>>;
}

export type UseQueryPaginatedResult<P extends PaginationParams = PaginationParams, R = unknown> = {
  params: P;
  initialParams: Partial<P>;
  mergeParams: (params: PaginationMergeParams<P>, reset?: boolean) => void;
  refetch: () => void;
} & Omit<UseInfiniteQueryResult<PaginationResponse<R> & { page: number }>, 'refetch'>;

/**
 * Hooks to simplify the use of an observable paginated
 * @param options `UseQueryPaginatedOptions`
 * @param deps React deps
 * @returns `UseQueryPaginatedPromise`
 */
export default function useQueryPaginated<P extends PaginationParams, R>(
  options: UseQueryPaginatedOptions<P, R>
): UseQueryPaginatedResult<P, R> {
  const firstRender = useRef(true);
  const queryClient = useQueryClient();

  const { initialParams: initialParamsOption, queryFn, ...queryOptions } = options;
  const [initialParams] = useState<P>(() => ({ pageSize: 10, ...(initialParamsOption ?? {}) }) as P);
  const [params, setParams] = useState<P>(() => ({ ...initialParams }));

  const query = useInfiniteQuery({
    ...queryOptions,
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const sendParams = { ...params } as P;
      return await queryFn({ page: pageParam, ...sendParams });
    },
    select: useCallback((data: InfiniteData<PaginationResponse<R>, number>) => {
      return {
        total: data.pages[data.pages.length - 1].total,
        result: data.pages.reduce((acc, page) => [...acc, ...page.result], [] as R[]),
        page: data.pageParams[data.pageParams.length - 1]
      };
    }, []),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      const totalPages = Math.ceil(lastPage.total / params.pageSize);
      return totalPages === lastPageParam ? undefined : lastPageParam + 1;
    }
  });

  const refetch = useCallback(() => {
    queryClient.resetQueries({ queryKey: queryOptions.queryKey, exact: true });
    query.refetch();
  }, [query, queryClient, queryOptions.queryKey]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (firstRender.current) {
        firstRender.current = false;
        return;
      }

      refetch();
    }, 0);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const mergeParams = useCallback(
    (newParams: PaginationMergeParams<P>, reset?: boolean) => {
      setParams(params => {
        if (typeof newParams === 'function') {
          newParams = newParams(params);
        }

        const newState = { ...(reset ? initialParams : params), ...newParams } as P;

        if (shallowEqualObjects(newState, params)) {
          return params;
        }

        return { ...newState };
      });
    },
    [initialParams]
  );

  return {
    ...query,
    initialParams,
    params,
    refetch,
    mergeParams
  };
}
