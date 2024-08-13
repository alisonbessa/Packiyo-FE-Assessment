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
} from '@mui/material'
import { QueryStatsOutlined } from '@mui/icons-material'
import { useSearchParams } from '@remix-run/react'
import { ProductsProps } from './types'
import { formatPrice } from '~/src/helpers/formatCurrency'

export const Products = ({
  products,
  currentPage,
  lastPage,
}: ProductsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', String(newPage))
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>SKU</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Qty Available</TableCell>
              <TableCell>Qty Backordered</TableCell>
              <TableCell>Actions</TableCell>
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
                <TableCell>{formatPrice(product.attributes.price)}</TableCell>
                <TableCell>{product.attributes.quantity_available}</TableCell>
                <TableCell>{product.attributes.quantity_backordered}</TableCell>
                <TableCell>
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
      </TableContainer>
      <Box sx={{ mt: 2 }}>
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
    </Container>
  )
}
