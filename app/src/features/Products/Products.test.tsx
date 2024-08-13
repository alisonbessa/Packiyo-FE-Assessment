import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Products } from './Products'
import { BrowserRouter } from 'react-router-dom'
import { formatPrice } from '../../helpers/formatCurrency'
const mockProducts = [
  {
    id: 'product-id-123321',
    attributes: {
      sku: 'SKU1',
      name: 'Product 1',
      price: '100',
      quantity_available: 10,
      quantity_backordered: 5,
      barcode: '123456',
      image: 'https://via.placeholder.com/50',
    },
  },
  {
    id: 'product-id-321123',
    attributes: {
      sku: 'SKU2',
      name: 'Product 2',
      price: '200',
      quantity_available: 20,
      quantity_backordered: 10,
      barcode: '123456',
      image: 'https://via.placeholder.com/50',
    },
  },
]

describe('Products Component', () => {
  const renderProducts = () =>
    render(
      <BrowserRouter>
        <Products products={mockProducts} currentPage={1} lastPage={2} />
      </BrowserRouter>
    )

  it('should render the products table with given products', () => {
    renderProducts()

    expect(screen.getByText('Products')).toBeInTheDocument()
    mockProducts.map((product) => {
      expect(screen.queryByText(product.id)).not.toBeInTheDocument()
      expect(screen.getByText(product.attributes.name)).toBeInTheDocument()
      expect(screen.getByText(product.attributes.sku)).toBeInTheDocument()
      expect(
        screen.getByText(formatPrice(product.attributes.price))
      ).toBeInTheDocument()
    })
  })

  it('should update URL parameters when "Find" button is clicked', async () => {
    const user = userEvent.setup()
    renderProducts()

    const nameInput = screen.getByLabelText('Name')
    const skuInput = screen.getByLabelText('SKU')
    const findButton = screen.getByText('Find')

    await user.type(nameInput, 'Product 1')
    await user.type(skuInput, 'SKU1')
    await user.click(findButton)

    expect(window.location.search).toContain('name=Product+1')
    expect(window.location.search).toContain('sku=SKU1')
  })

  it('should call handleClearClick when clicking Clear button', async () => {
    const user = userEvent.setup()
    renderProducts()

    const nameInput = screen.getByLabelText('Name')
    const skuInput = screen.getByLabelText('SKU')
    const clearButton = screen.getByText('Clear')

    await user.type(nameInput, 'Product 1')
    await user.type(skuInput, 'SKU1')
    await user.click(clearButton)

    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('SKU')).toHaveValue('')
  })

  it('should show no products message if no products are available', () => {
    render(
      <BrowserRouter>
        <Products products={[]} currentPage={1} lastPage={1} />
      </BrowserRouter>
    )

    expect(screen.getByText('No products were found')).toBeInTheDocument()
    expect(
      screen.getByText('Try changing filters or adding new products')
    ).toBeInTheDocument()
  })
})
