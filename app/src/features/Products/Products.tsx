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
  IconButton,
  ButtonGroup,
  Box,
  TextField,
  Button,
  Tooltip,
} from '@mui/material'
import { QueryStatsOutlined, Edit, Delete } from '@mui/icons-material'
import { useSearchParams, useFetcher } from '@remix-run/react'
import { ChangeEvent, useState } from 'react'
import { ProductsProps } from './Products.types'
import { FilterButtons, FilterWrapper } from './Products.styles'
import { formatPrice } from '../../helpers/formatCurrency'
import { ConfirmationModal } from '../../components/ConfirmationModal'
import { ProductModal } from '~/src/components/ProductModal'

export const Products = ({ products, meta, customers }: ProductsProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    name: searchParams.get('name') || '',
    sku: searchParams.get('sku') || '',
  })
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  )
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const fetcher = useFetcher()
  console.log({ meta })
  const { currentPage, lastPage, perPage, total } = meta.page

  const pages = []
  for (let i = 1; i <= lastPage; i++) {
    pages.push(i)
  }

  console.log({ customers })

  const firstItemFromPage = (currentPage - 1) * perPage + 1
  const lastItemFromPAge =
    currentPage === lastPage ? total : currentPage * perPage

  const tableItemsMessage = `${firstItemFromPage}-${lastItemFromPAge} of ${total} products`

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', String(newPage))
    setSearchParams(searchParams)
  }

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    })
  }

  const handleFind = () => {
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

  const handleClear = () => {
    setFilters({ name: '', sku: '' })
    searchParams.delete('name')
    searchParams.delete('sku')
    setSearchParams(searchParams)
  }

  const handleCreate = () => {
    setModalMode('create')
    setOpenModal(true)
  }

  const handleEdit = (id: string) => {
    setModalMode('edit')
    setSelectedProductId(id)
    setOpenModal(true)
  }

  const handleDelete = (id: string) => {
    setSelectedProductId(id)
    setOpenDeleteModal(true)
  }

  const confirmDelete = () => {
    if (selectedProductId) {
      fetcher.submit(
        { id: selectedProductId },
        {
          method: 'DELETE',
          action: '/products',
        }
      )
      setOpenDeleteModal(false)
    }
  }

  const cancelDelete = () => {
    setOpenDeleteModal(false)
  }

  return (
    <Container>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" component="h1">
          Products
        </Typography>
        <Button variant="contained" onClick={handleCreate}>
          New Product
        </Button>
      </Box>
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
        </Box>
        <Box width="100%" display="flex" gap="1rem" justifyContent="flex-end">
          <FilterButtons
            variant="contained"
            color="primary"
            onClick={handleFind}
          >
            Find
          </FilterButtons>
          <FilterButtons
            variant="outlined"
            color="secondary"
            onClick={handleClear}
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
                      <Tooltip title="See item details">
                        <IconButton
                          color="primary"
                          href={`/products/${product.id}`}
                        >
                          <QueryStatsOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit this item">
                        <IconButton
                          color="primary"
                          onClick={() => handleEdit(product.id)}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete this item">
                        <IconButton
                          color="primary"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="body2">{tableItemsMessage}</Typography>
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
      <ConfirmationModal
        title="Are you sure?"
        open={openDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        message="This action will permanently delete this product"
      />
      <ProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        mode={modalMode}
        product={
          modalMode === 'edit'
            ? products.find((product) => product.id === selectedProductId)
                ?.attributes
            : {}
        }
      />
    </Container>
  )
}
