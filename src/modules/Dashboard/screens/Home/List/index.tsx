import { get } from '@/api';
import useQueryPaginated from '@/hooks/useQueryPaginated';
import AppHeader from '@/modules/Shared/components/Header';
import QueryFlatList from '@/modules/Shared/components/QueryFlatList';

import ListItem from './ListItem';
import { ListRequest, ListResponseItem } from './schema';

const ListScreen = () => {
  const query = useQueryPaginated<ListRequest, ListResponseItem>({
    initialParams: { pageSize: 30 },
    queryKey: ['dashboard', 'list'],
    queryFn: params => get('/dashboard/list', params)
  });

  return (
    <>
      <AppHeader title='Dashboard' disableBack>
        <AppHeader.Action icon='refresh' onPress={query.refetch} />
      </AppHeader>
      <QueryFlatList query={query} ItemComponent={ListItem} />
    </>
  );
};

export default ListScreen;
