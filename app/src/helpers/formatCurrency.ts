export const formatPrice = (
  price: string | number,
  currency: string = 'USD'
) => {
  const priceNumber = typeof price === 'string' ? parseFloat(price) : price

  if (isNaN(priceNumber)) {
    return price
  }

  return priceNumber.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  })
}
