export interface OrderDetailsResponse {
  data: {
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
      is_wholesale: boolean
      fraud_hold: number
      address_hold: number
      payment_hold: number
      operator_hold: number
      allow_partial: number
      ordered_at: string
      updated_at: string
      fulfilled_at: string | null
      cancelled_at: string | null
      archived_at: string | null
      hold_until: string | null
      ship_before: string | null
      scheduled_delivery: string | null
      gift_note: string | null
      internal_note: string | null
      slip_note: string | null
      external_id: string | null
      packing_note: string | null
      shipping_method_name: string | null
      created_at: string
    }
    relationships: {
      customer: {
        data: {
          id: string
        }
      }
      shipping_contact_information: {
        data: {
          id: string
        }
      }
      billing_contact_information: {
        data: {
          id: string
        }
      }
      order_items: {
        data: Array<{
          id: string
        }>
      }
    }
  }
  included: Array<{
    id: string
    type: string
    attributes: Record<string, any>
    relationships: {
      product: {
        data: {
          id: string
        }
      }
    }
  }>
}
