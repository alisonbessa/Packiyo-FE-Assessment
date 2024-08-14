import type { LoaderFunction } from '@remix-run/node'
import { json, useLoaderData } from '@remix-run/react'
import { ProductDetails } from '~/src/features/ProductDetails'
import { ProductDetailsType } from '~/src/features/ProductDetails/types'

export const loader: LoaderFunction = async ({ params }) => {
  const baseUrl = process.env.API_URL
  const token = process.env.API_TOKEN

  if (!baseUrl || !token) {
    throw new Error(
      'API URL and Token must be provided in the environment variables.'
    )
  }

  const productId = params.id
  const response = await fetch(`${baseUrl}/products/${productId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.api+json',
    },
  })

  if (!response.ok) {
    throw new Response('Product not found', { status: response.status })
  }

  const data = await response.json()
  return json(data.data)
}

export default function ProductDetailsRoute() {
  const product = useLoaderData<ProductDetailsType>()

  return <ProductDetails product={product} />
}
