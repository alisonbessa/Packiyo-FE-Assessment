import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
  Box,
  TextField,
} from '@mui/material'
import { QueryStatsOutlined } from '@mui/icons-material'
import { useSearchParams } from '@remix-run/react'
import { useState } from 'react'
import { ProductsProps } from './Products.types'
import { formatPrice } from '~/src/helpers/formatCurrency'
import { FilterButtons, FilterWrapper } from './Products.styles'

export const Products = ({
  products,
  currentPage,
  lastPage,
}: ProductsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    name: searchParams.get('name') || '',
    sku: searchParams.get('sku') || '',
  })

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', String(newPage))
    setSearchParams(searchParams)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    })
  }

  const handleFindClick = () => {
    if (filters.name) {
      searchParams.set('name', filters.name)
    } else {
      searchParams.delete('name')
    }

    if (filters.sku) {
      searchParams.set('sku', filters.sku)
    } else {
      searchParams.delete('sku')
    }

    setSearchParams(searchParams)
  }

  const handleClearClick = () => {
    setFilters({ name: '', sku: '' })
    searchParams.delete('name')
    searchParams.delete('sku')
    setSearchParams(searchParams)
  }

  const pages = []
  for (let i = 1; i <= lastPage; i++) {
    pages.push(i)
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Products
      </Typography>
      <FilterWrapper>
        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
          Filters
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <TextField
            label="Name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            fullWidth
          />
          <TextField
            label="SKU"
            name="sku"
            value={filters.sku}
            onChange={handleFilterChange}
            fullWidth
          />
          <FilterButtons
            variant="contained"
            color="primary"
            onClick={handleFindClick}
          >
            Find
          </FilterButtons>
          <FilterButtons
            variant="outlined"
            color="secondary"
            onClick={handleClearClick}
          >
            Clear
          </FilterButtons>
        </Box>
      </FilterWrapper>
      <TableContainer component={Paper} style={{ padding: 16 }}>
        {products.length ? (
          <>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Qty Available</TableCell>
                  <TableCell>Qty Backordered</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.attributes.image ? (
                        <img
                          src={product.attributes.image}
                          alt={product.attributes.name}
                          style={{ height: '50px' }}
                        />
                      ) : (
                        <Box bgcolor="#f4f4f4" width={36} height={36} />
                      )}
                    </TableCell>
                    <TableCell>{product.attributes.name}</TableCell>
                    <TableCell>{product.attributes.sku}</TableCell>
                    <TableCell>
                      {formatPrice(product.attributes.price)}
                    </TableCell>
                    <TableCell>
                      {product.attributes.quantity_available}
                    </TableCell>
                    <TableCell>
                      {product.attributes.quantity_backordered}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        href={`/products/${product.id}`}
                      >
                        <QueryStatsOutlined />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <ButtonGroup>
                <Button
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                {pages.map((page) => (
                  <Button
                    key={page}
                    variant={page === currentPage ? 'contained' : 'outlined'}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  disabled={currentPage === lastPage}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </ButtonGroup>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h6" component="h3" sx={{ mb: 0 }}>
              No products were found
            </Typography>
            <Typography variant="subtitle1">
              Try changing filters or adding new products
            </Typography>
          </>
        )}
      </TableContainer>
    </Container>
  )
}
