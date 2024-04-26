import useQueryPaginated from '@eduzz/ui-hooks-query/useQueryPaginated';

import { get } from '@/api';
import AppHeader from '@/modules/Shared/components/Header';
import QueryFlatList from '@/modules/Shared/components/QueryFlatList';

import ListItem from './ListItem';
import { ListRequest, ListResponseItem } from './schema';

const ListScreen = () => {
  const query = useQueryPaginated<ListRequest, ListResponseItem>({
    initialParams: { page: 1, perPage: 30 },
    infintyScroll: true,
    queryKey: ['dashboard', 'list'],
    queryFn: params => get('/dashboard/list', params)
  });

  return (
    <>
      <QueryFlatList
        query={query}
        ListHeaderComponent={<AppHeader title='Dashboard' disableBack />}
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        ItemComponent={ListItem}
      />
    </>
  );
};

export default ListScreen;
