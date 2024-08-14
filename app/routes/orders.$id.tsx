import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import { OrderDetails } from '../src/features/OrderDetails'
import { OrderDetailsResponse } from '../src/features/OrderDetails/OrderDetails.types'

export const loader: LoaderFunction = async ({ params }) => {
  const BASE_URL = process.env.API_URL
  const TOKEN = process.env.API_TOKEN

  if (!BASE_URL || !TOKEN) {
    throw new Error(
      'API URL and Token must be provided in the environment variables.'
    )
  }

  const { id: orderId } = params
  if (!orderId) {
    throw new Response('Order ID not provided', { status: 400 })
  }

  const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.api+json',
    },
  })

  if (!response.ok) {
    throw new Response('Failed to fetch order details', {
      status: response.status,
    })
  }

  const data: OrderDetailsResponse = await response.json()
  return json(data)
}

export default function OrderDetailsRoute() {
  const orderDetails = useLoaderData<OrderDetailsResponse>()

  return <OrderDetails orderDetails={orderDetails} />
}
