import useQueryPaginated from '@eduzz/ui-hooks-query/useQueryPaginated';

import { get } from '@/api';
import { SeizureRequestListRequest, SeizureRequestListResponseItem } from '@/schemas/list';
import QueryFlatList from '@/shared/QueryFlatList';

import Item from './Item';

const ListScreen = () => {
  const query = useQueryPaginated<SeizureRequestListRequest, SeizureRequestListResponseItem>({
    initialParams: { page: 1, perPage: 30 },
    infintyScroll: true,
    queryKey: ['seizure-requests', 'list'],
    queryFn: params => get('/app/seizure-requests', params)
  });

  return <QueryFlatList query={query} ItemComponent={Item} />;
};

export default ListScreen;
