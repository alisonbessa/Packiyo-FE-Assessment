import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json, redirect, useLoaderData } from '@remix-run/react'
import { Products } from '~/src/features/Products'
import {
  Customer,
  Included,
  Product,
  ProductsResponse,
} from '~/src/features/Products/Products.types'

export const loader: LoaderFunction = async ({ request }) => {
  const BASE_URL = process.env.API_URL
  const TOKEN = process.env.API_TOKEN

  const url = new URL(request.url)
  const page = url.searchParams.get('page') || '1'
  const perPage = url.searchParams.get('perPage') || '8'
  const name = url.searchParams.get('name')
  const sku = url.searchParams.get('sku')

  if (!BASE_URL || !TOKEN) {
    throw new Error(
      'API URL and Token must be provided in the environment variables.'
    )
  }

  let query = `${BASE_URL}/products?page[number]=${page}&page[size]=${perPage}`

  if (name || sku) {
    query = `${BASE_URL}/products?page[size]=${perPage}`
  }

  if (name) {
    query += `&filter[name]=${name}`
  }

  if (sku) {
    query += `&filter[sku]=${sku}`
  }

  const response = await fetch(query, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.api+json',
    },
  })

  if (!response.ok) {
    throw new Response('Failed to fetch products', { status: response.status })
  }

  const customersResponse = await fetch(`${BASE_URL}/customers`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.api+json',
    },
  })

  if (!customersResponse.ok) {
    throw new Response('Failed to fetch customers', {
      status: customersResponse.status,
    })
  }

  const data: ProductsResponse = await response.json()
  const customers = await customersResponse.json()

  return json({ ...data, customers })
}

export const meta: MetaFunction = () => [{ title: 'Products' }]

export const action: ActionFunction = async ({ request }) => {
  const BASE_URL = process.env.API_URL
  const TOKEN = process.env.API_TOKEN

  if (!BASE_URL || !TOKEN) {
    throw new Error(
      'API URL and Token must be provided in the environment variables.'
    )
  }

  const formData = new URLSearchParams(await request.text())

  if (request.method === 'DELETE') {
    const id = formData.get('id')

    if (!id) {
      throw new Response('Product ID is required', { status: 400 })
    }

    const response = await fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.api+json',
      },
    })

    if (!response.ok) {
      throw new Response('Failed to delete product', {
        status: response.status,
      })
    }

    return json({ success: true })
  }
}

export default function ProductsRoute() {
  const { data: products, meta, customers } = useLoaderData<ProductsResponse>()

  const getCustomersWithNames = (
    data: Customer[],
    included: Included[]
  ): { id: string; name: string }[] => {
    return data.map((customer) => {
      const relationId = customer.relationships.contact_information.data.id
      const relatedInfo = included.find((item) => item.id === relationId)
      return {
        id: customer.id,
        name: relatedInfo ? relatedInfo.attributes.name : 'Unknown',
      }
    })
  }

  const customersList = getCustomersWithNames(
    customers.data,
    customers.included
  )

  return <Products products={products} meta={meta} customers={customersList} />
}
