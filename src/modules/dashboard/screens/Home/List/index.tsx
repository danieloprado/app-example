import { get } from '@app/shared/api';
import AppHeader from '@app/shared/components/Header';
import QueryFlatList from '@app/shared/components/QueryFlatList';
import useQueryPaginated from '@app/shared/hooks/useQueryPaginated';

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
