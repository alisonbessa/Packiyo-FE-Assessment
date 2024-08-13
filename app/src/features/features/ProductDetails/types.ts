export interface ProductDetailsAttributes {
  sku: string
  name: string
  price: string
  quantity_available: number
  barcode: string
  image: string
  description?: string
  width?: number
  height?: number
  length?: number
  weight?: number
}

export interface ProductDetailsType {
  id: string
  attributes: ProductDetailsAttributes
}
