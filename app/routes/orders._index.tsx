import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import { OrdersResponse } from '../src/features/Orders/Orders.types'
import { Orders } from '../src/features/Orders'

export const loader: LoaderFunction = async ({ request }) => {
  const BASE_URL = process.env.API_URL
  const TOKEN = process.env.API_TOKEN

  const url = new URL(request.url)
  const page = url.searchParams.get('page') || '1'
  const perPage = url.searchParams.get('perPage') || '10'

  const number = url.searchParams.get('number')
  const status = url.searchParams.get('status_text')
  const combined_status = url.searchParams.get('combined_status')

  let query = `${BASE_URL}/orders?page[number]=${page}&page[size]=${perPage}`

  if (number) query += `&filter[number]=${number}`
  if (status) query += `&filter[status_text]=${status}`
  if (combined_status) query += `&filter[${combined_status}]=1`
  if (!BASE_URL || !TOKEN) {
    throw new Error(
      'API URL and Token must be provided in the environment variables.'
    )
  }

  const response = await fetch(query, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.api+json',
    },
  })

  if (!response.ok) {
    throw new Response('Failed to fetch orders', { status: response.status })
  }

  const data: OrdersResponse = await response.json()
  return json(data)
}

export const meta: MetaFunction = () => [{ title: 'Orders' }]

export default function OrdersRoute() {
  const { data: orders, meta } = useLoaderData<OrdersResponse>()
  return (
    <Orders
      orders={orders}
      currentPage={meta.page.currentPage}
      lastPage={meta.page.lastPage}
    />
  )
}
