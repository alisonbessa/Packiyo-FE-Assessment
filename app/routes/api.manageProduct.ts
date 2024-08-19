import { json, ActionFunction, redirect } from '@remix-run/node'

export const action: ActionFunction = async ({ request }) => {
  const BASE_URL = process.env.API_URL
  const TOKEN = process.env.API_TOKEN

  if (!BASE_URL || !TOKEN) {
    throw new Error(
      'API URL and Token must be provided in the environment variables.'
    )
  }

  const formData = await request.formData()
  const sku = formData.get('sku')
  const name = formData.get('name')
  const barcode = formData.get('barcode')
  const price = formData.get('price')
  const value = formData.get('value')
  const customerId = formData.get('customerId') || '16'
  const productId = formData.get('productId')

  const urlExtension =
    request.method === 'POST' ? '/products' : `/products/${productId}`

  const postPayload = {
    data: {
      type: 'products',
      attributes: {
        sku,
        name,
        price: parseFloat(price as string),
        value: parseFloat(value as string),
        barcode,
      },
      relationships: {
        customer: {
          data: {
            type: 'customers',
            id: customerId,
          },
        },
      },
    },
  }

  const editPayload = {
    data: {
      ...postPayload.data,
      id: productId,
    },
  }

  const payload = request.method === 'POST' ? postPayload : editPayload

  const response = await fetch(`${BASE_URL}${urlExtension}`, {
    method: request.method,
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorData = await response.json()
    const errorMessage = errorData.errors?.[0]?.detail || 'Unknown error'
    console.error('Erro:', errorMessage)
    return json({ error: errorMessage }, { status: response.status })
  }

  return true
}
