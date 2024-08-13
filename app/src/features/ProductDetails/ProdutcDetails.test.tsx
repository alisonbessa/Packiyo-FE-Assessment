import { render, screen } from '@testing-library/react'
import { ProductDetails } from './ProductDetails'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { formatPrice } from '../../helpers/formatCurrency'

const mockProduct = {
  id: '1',
  attributes: {
    sku: 'rscp-01',
    name: 'Red Sox cap',
    price: '22.00',
    quantity_available: 0,
    barcode: '17775556',
    image: '',
    description: 'A cool red cap.',
    width: 30,
    height: 10,
    length: 20,
    weight: 0.5,
    created_at: '2024-08-13T15:39:08.000000Z',
    updated_at: '2024-08-13T15:39:08.000000Z',
  },
}

describe('ProductDetails Component', () => {
  const renderProductDetails = (product = mockProduct) =>
    render(
      <BrowserRouter>
        <ProductDetails product={product} />
      </BrowserRouter>
    )

  it('should render the product basic details correctly', async () => {
    await renderProductDetails()

    expect(screen.getAllByText(mockProduct.attributes.name)).toHaveLength(2)
    expect(
      screen.getByText(mockProduct.attributes.description)
    ).toBeInTheDocument()
    expect(
      screen.getByText(formatPrice(mockProduct.attributes.price))
    ).toBeInTheDocument()
    expect(
      screen.getByText(mockProduct.attributes.quantity_available.toString())
    ).toBeInTheDocument()
    expect(screen.getByText(mockProduct.attributes.sku)).toBeInTheDocument()
  })

  it('should show a placeholder image if image is not provided', () => {
    renderProductDetails()

    const image = screen.getByAltText('Red Sox cap') as HTMLImageElement
    expect(image.src).toContain('https://via.placeholder.com/300')
  })

  it('should render the price correctly', () => {
    renderProductDetails()

    expect(screen.getByText('$22.00')).toBeInTheDocument()
  })

  it('should not render dimensions if width, height, and length are not provided', () => {
    const productWithoutDimensions = {
      ...mockProduct,
      attributes: {
        ...mockProduct.attributes,
        width: null,
        height: null,
        length: null,
      },
    }
    renderProductDetails(productWithoutDimensions)

    expect(screen.queryByText(/Dimensions:/)).not.toBeInTheDocument()
  })

  it('should not render weight if not provided', () => {
    const productWithoutWeight = {
      ...mockProduct,
      attributes: {
        ...mockProduct.attributes,
        weight: null,
      },
    }
    renderProductDetails(productWithoutWeight)

    expect(screen.queryByText(/Weight:/)).not.toBeInTheDocument()
  })

  it('should navigate back to products when the "Back to Products" button is clicked', async () => {
    const user = userEvent.setup()
    renderProductDetails()

    const backButton = screen.getByRole('link', { name: /Back to Products/i })
    await user.click(backButton)

    expect(global.window.location.pathname).toEqual('/products')
  })
})
