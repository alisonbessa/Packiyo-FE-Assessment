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
  const cost = formData.get('cost')
  const customerId = formData.get('customerId') || '16'

  const payload = {
    data: {
      type: 'products',
      attributes: {
        sku,
        name,
        price: parseFloat(price as string),
        cost: parseFloat(cost as string),
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

  const response = await fetch(`${BASE_URL}/products`, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(payload),
  })

  console.log({ response })

  if (!response.ok) {
    const errorData = await response.json()
    const errorMessage = errorData.errors?.[0]?.detail || 'Unknown error'
    console.error('Erro:', errorMessage)
    return json({ error: errorMessage }, { status: response.status })
  }

  return redirect('/products')
}
