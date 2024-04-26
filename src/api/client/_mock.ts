import { ListRequest, ListResponse } from '@/modules/Dashboard/screens/Home/List/schema';

const listData = new Array(100).fill('a').map(
  (_, index) =>
    ({
      id: index,
      name: 'Teste ' + (index + 1),
      icon: 'database-search'
    }) as ListResponse['result'][number]
);

export const _apiMock: Record<string, (params: any) => any> = {
  '/auth/login': () => {
    return {
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBpdHNlY3Rvci5wdCJ9.WF2NMlQcWV4vjYzCirlTJE3p-W5sIbGcW-TBl2VGeak',
      refreshToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJqb2huLmRvZUBpdHNlY3Rvci5wdCJ9.WF2NMlQcWV4vjYzCirlTJE3p-W5sIbGcW-TBl2VGeak'
    };
  },
  '/dashboard/list': (params: ListRequest): ListResponse => {
    const start = (params.page - 1) * params.pageSize;
    const end = start + params.pageSize;

    return {
      total: 100,
      result: listData.slice(start, end)
    };
  }
};
