export function generatePaymentSummary(totalLabel, pricing) {
  const displayItems = pricing.map(item => ({
    label: item.label + ' x' + item.count,
    amount: item.price * item.count
  }));

  const total = {
    label: totalLabel,
    amount: displayItems.reduce((accum, item) => accum + item.amount, 0)
  };

  return {
    total,
    displayItems
  };
}
