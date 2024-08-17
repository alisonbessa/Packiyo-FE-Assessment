export type Product = {
  id: string
  attributes: {
    sku: string
    name: string
    price: string
    value: string
    quantity_available: number
    quantity_backordered: number
    barcode: string
    image: string
  }
  relationships: {
    customer: {
      data: {
        id: string
      }
    }
  }
}
export interface ProductsProps {
  products: Product[]
  meta: {
    page: {
      currentPage: number
      lastPage: number
      perPage: number
      total: number
    }
  }
  customers: {
    id: string
    name: string
  }[]
}

export interface PaginationMeta {
  currentPage: number
  lastPage: number
  perPage: number
  total: number
}

export interface Customer {
  id: string
  relationships: {
    contact_information: {
      data: {
        id: string
      }
    }
  }
}

export interface Included {
  id: string
  attributes: {
    name: string
  }
}

export interface ProductsResponse {
  data: Product[]
  meta: {
    page: PaginationMeta
  }
  customers: {
    data: Customer[]
    included: Included[]
  }
}
