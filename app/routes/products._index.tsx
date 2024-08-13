import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import { Product } from '~/src/components/ProductCard/productCard.types'
import { Products } from '~/src/features/features/Products'

interface ProductsResponse {
  data: Product[]
  meta: {
    page: {
      currentPage: number
      lastPage: number
      perPage: number
      total: number
    }
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const BASE_URL = process.env.API_URL
  const TOKEN = process.env.API_TOKEN

  const url = new URL(request.url)
  const page = url.searchParams.get('page') || '1'
  const perPage = url.searchParams.get('perPage') || '10'
  const name = url.searchParams.get('name')
  const sku = url.searchParams.get('sku')

  if (!BASE_URL || !TOKEN) {
    throw new Error(
      'API URL and Token must be provided in the environment variables.'
    )
  }

  let query = `${BASE_URL}/products?page[number]=${page}&page[size]=${perPage}`

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

  const data: ProductsResponse = await response.json()
  return json(data)
}

export const meta: MetaFunction = () => [{ title: 'Products' }]

export default function ProductsRoute() {
  const { data: products, meta } = useLoaderData<ProductsResponse>()

  return (
    <Products
      products={products}
      currentPage={meta.page.currentPage}
      lastPage={meta.page.lastPage}
    />
  )
}
