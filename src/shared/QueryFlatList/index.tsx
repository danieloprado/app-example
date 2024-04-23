import { ComponentType, useCallback, useEffect, useRef } from 'react';
import { FlatList, FlatListProps, InteractionManager, ListRenderItemInfo, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

import { UseQueryPaginatedResult } from '@eduzz/ui-hooks-query/useQueryPaginated';

import { PaginationRequest } from '@/schemas/pagination';

import Empty from '../Empty';
import ErrorMessage from '../ErrorMessage';
import AppRefreshControl from '../RefreshControl';

interface QueryFlatListProps<T, TI>
  extends Omit<
    FlatListProps<TI>,
    'ref' | 'data' | 'refreshControl' | 'onEndReached' | 'ListFooterComponent' | 'keyExtractor' | 'renderItem'
  > {
  query: UseQueryPaginatedResult<PaginationRequest<T, any, any>, TI>;
  ItemComponent: ComponentType<{ data: T; index: number }>;
}

function QueryFlatList<T, TI extends { id: number | string }>({
  query,
  ItemComponent,
  ...flatListProps
}: QueryFlatListProps<T, TI>) {
  const flatListRef = useRef<FlatList>(null);
  const keyExtractor = useCallback((item: TI) => `${item.id}`, []);

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<any>) => <ItemComponent data={item} index={index} />,
    [ItemComponent]
  );

  const onEndReached = useCallback(() => {
    if (!query.infinityHasMore || query.isFetching || query.isLoading || query.error) return;
    query.mergeParams(params => ({ page: (params.page ?? 0) + 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.infinityHasMore, query.isFetching, query.isLoading, query.error, query.mergeParams]);

  const renderFooter = useCallback(() => {
    if (!query.infinityHasMore || !query.isSuccess) {
      return null;
    }

    return <ActivityIndicator size={40} style={styles.loader} />;
  }, [query.infinityHasMore, query.isSuccess]);

  const isFirstPage = query.params.page === 1;

  useEffect(() => {
    if (!isFirstPage || !query.data?.result.length) return;
    const interaction = InteractionManager.runAfterInteractions(() =>
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
    );
    return () => interaction.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFirstPage]);

  return (
    <FlatList
      contentInsetAdjustmentBehavior='always'
      onEndReachedThreshold={0.2}
      {...flatListProps}
      ref={flatListRef}
      data={query.isError ? [] : query.data?.result}
      refreshControl={
        <AppRefreshControl
          refreshing={isFirstPage && (query.isLoading || query.isFetching)}
          onRefresh={query.refresh}
        />
      }
      onEndReached={onEndReached}
      ListFooterComponent={renderFooter}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListEmptyComponent={
        <>
          {!query.isLoading && !query.isError && !query.data?.result.length && <Empty />}
          {!query.isLoading && query.isError && <ErrorMessage error={query.error} onPress={query.refresh} />}
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    marginVertical: 20
  }
});

export default QueryFlatList;
