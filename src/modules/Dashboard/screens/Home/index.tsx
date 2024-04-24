import useQueryPaginated from '@eduzz/ui-hooks-query/useQueryPaginated';

import { get } from '@/api';
import QueryFlatList from '@/modules/Shared/components/QueryFlatList';

import ListItem from './ListItem';
import { SeizureRequestListRequest, SeizureRequestListResponseItem } from './schema';

const ListScreen = () => {
  const query = useQueryPaginated<SeizureRequestListRequest, SeizureRequestListResponseItem>({
    initialParams: { page: 1, perPage: 30 },
    infintyScroll: true,
    queryKey: ['seizure-requests', 'list'],
    queryFn: params => get('/app/seizure-requests', params)
  });

  return <QueryFlatList query={query} ItemComponent={ListItem} />;
};

export default ListScreen;
