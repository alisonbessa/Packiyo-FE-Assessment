export interface ProductDetailsAttributes {
  sku: string
  name: string
  price: string
  quantity_available: number
  barcode: string
  image: string
  description?: string
  width: number | null
  height: number | null
  length: number | null
  weight: number | null
  created_at: string
  updated_at: string
}

export interface ProductDetailsType {
  id: string
  attributes: ProductDetailsAttributes
}
