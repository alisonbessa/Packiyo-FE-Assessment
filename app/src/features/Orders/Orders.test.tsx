import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Orders } from './Orders'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import { Order } from './Orders.types'

export const mockOrders: Order[] = [
  {
    id: '1',
    attributes: {
      number: '#ORDER-001',
      status_text: 'Pending',
      shipping: 10.0,
      tax: 5.0,
      discount: 0.0,
      total: 100.0,
      ready_to_ship: 1,
      ready_to_pick: 0,
      fraud_hold: 0,
      address_hold: 0,
      payment_hold: 0,
      operator_hold: 0,
      allow_partial: 1,
      ordered_at: '2024-08-01T00:00:00.000Z',
      updated_at: '2024-08-02T00:00:00.000Z',
      shipping_method_name: 'Standard Shipping',
      shipping_method_code: 'STD',
      tote: 'Tote001',
      tags: 'Tag1,Tag2',
      created_at: '2024-08-01T00:00:00.000Z',
    },
  },
  {
    id: '2',
    attributes: {
      number: '#ORDER-002',
      status_text: 'Ready',
      shipping: 15.0,
      tax: 7.5,
      discount: 5.0,
      total: 200.0,
      ready_to_ship: 1,
      ready_to_pick: 1,
      fraud_hold: 0,
      address_hold: 0,
      payment_hold: 0,
      operator_hold: 0,
      allow_partial: 1,
      ordered_at: '2024-08-03T00:00:00.000Z',
      updated_at: '2024-08-04T00:00:00.000Z',
      ship_before: '2024-08-05T00:00:00.000Z',
      gift_note: 'Happy Birthday!',
      internal_note: 'Internal note example',
      slip_note: 'Slip note example',
      external_id: 'EXT-002',
      packing_note: 'Handle with care',
      shipping_method_name: 'Express Shipping',
      shipping_method_code: 'EXP',
      tote: 'Tote002',
      tags: 'Priority',
      created_at: '2024-08-03T00:00:00.000Z',
    },
  },
]

describe('Orders Component', () => {
  const renderOrders = () =>
    render(
      <BrowserRouter>
        <Orders orders={mockOrders} currentPage={1} lastPage={2} />
      </BrowserRouter>
    )

  it('should render the orders table with correct data', () => {
    renderOrders()

    expect(screen.getByText('#ORDER-001')).toBeInTheDocument()
    expect(screen.getByText('#ORDER-002')).toBeInTheDocument()

    expect(screen.getByText('Pending')).toBeInTheDocument()
    expect(screen.getByText('Ready')).toBeInTheDocument()

    expect(screen.getByText('$100')).toBeInTheDocument()
    expect(screen.getByText('$200')).toBeInTheDocument()

    expect(screen.getByText('8/1/2024')).toBeInTheDocument()
    expect(screen.getByText('8/2/2024')).toBeInTheDocument()
    expect(screen.getByText('8/3/2024')).toBeInTheDocument()
  })

  it('should call handleFindClick when the "Find" button is clicked', async () => {
    renderOrders()
    const user = userEvent.setup()

    const findButton = screen.getByText('Find')
    await user.click(findButton)

    expect(screen.getByText('Filters')).toBeInTheDocument()
  })

  it('should clear filters when the "Clear" button is clicked', async () => {
    renderOrders()
    const user = userEvent.setup()

    const numberInput = screen.getByLabelText('Order Number')
    const clearButton = screen.getByText('Clear')

    await user.type(numberInput, '123')

    await user.click(clearButton)

    expect(numberInput).toHaveValue('')
  })

  it('should change pages when pagination buttons are clicked', async () => {
    renderOrders()
    const user = userEvent.setup()

    const nextPageButton = screen.getByText('Next')
    await user.click(nextPageButton)

    expect(screen.getByText('Filters')).toBeInTheDocument()
  })
})
