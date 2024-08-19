import { Product } from '../features/Products/Products.types'

export const createProductData = (product: Product | undefined) => {
  if (!product) return {}

  return {
    id: product.id || '',
    sku: product.attributes.sku || '',
    name: product.attributes.name || '',
    barcode: product.attributes.barcode || '',
    price: product.attributes.price || '',
    value: product.attributes.value || '',
    customerId: product.relationships.customer.data.id || '',
  }
}
