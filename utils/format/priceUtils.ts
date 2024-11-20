export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
