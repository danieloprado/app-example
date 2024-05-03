export default function errorFormatter(err: any): string {
  if (typeof err === 'string') {
    return err;
  }

  switch ((err || {}).message) {
    case 'no-internet':
    case 'NETWORK_ERROR':
      return 'Sem conexão com a internet';
    case 'api-error':
      if (err.status === 400) {
        return err.data?.message ?? 'Dados inválidos';
      }

      if (err.status === 404 && !`${err.data?.message ?? ''}`?.toLowerCase().includes('not found')) {
        return err.data?.message ?? 'Não encontrado';
      }

      const status: any = {
        '-1': 'Não conseguimos comunicação com o servidor. Você está sem internet?',
        401: 'Sem permissão de acesso',
        403: 'Sem permissão de acesso',
        404: 'Não encontrado',
        422: 'Dados inválidos'
      };

      return status[err.status] || 'Algo deu errado...';
    default:
      return 'Algo deu errado...';
  }
}
