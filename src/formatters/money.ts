const formatter = new Intl.NumberFormat('pt-PT', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2
});

export function formatMoney(value: string | number) {
  return formatter.format(Number(value));
}
