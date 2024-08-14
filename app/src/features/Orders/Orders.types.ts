export interface Order {
  id: string
  attributes: {
    number: string
    status_text: string
    shipping: number
    tax: number
    discount: number
    total: number
    ready_to_ship: number
    ready_to_pick: number
    is_wholesale?: boolean | null
    fraud_hold: number
    address_hold: number
    payment_hold: number
    operator_hold: number
    allow_partial: number
    ordered_at: string
    updated_at: string
    fulfilled_at?: string | null
    cancelled_at?: string | null
    archived_at?: string | null
    hold_until?: string | null
    ship_before?: string | null
    scheduled_delivery?: string | null
    gift_note?: string | null
    internal_note?: string | null
    slip_note?: string | null
    external_id?: string | null
    packing_note?: string | null
    shipping_method_name?: string | null
    shipping_method_code?: string | null
    tote: string
    tags: string
    created_at: string
  }
}

export interface OrdersProps {
  orders: Order[]
  currentPage: number
  lastPage: number
}

export interface OrdersResponse {
  data: Order[]
  meta: {
    page: {
      currentPage: number
      lastPage: number
      perPage: number
      total: number
    }
  }
}
