export function shoppingCartPayload({ total, currency }) {
  return {
    value: total.amount / 100,
    currency
  };
}
