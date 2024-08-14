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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from '@mui/material'
import { QueryStatsOutlined } from '@mui/icons-material'
import { useSearchParams, Link } from '@remix-run/react'
import { OrdersProps } from './Orders.types'
import { useState } from 'react'
import { FilterButtons, FilterWrapper } from './Orders.styles'

export function Orders({ orders, currentPage, lastPage }: OrdersProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    number: searchParams.get('number') || '',
    status: searchParams.get('status_text') || '',
    combined_status: searchParams.get('combined_status') || '',
  })

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target as HTMLInputElement
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }))
  }

  const handleFindClick = () => {
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        searchParams.set(key, filters[key])
      } else {
        searchParams.delete(key)
      }
    })
    setSearchParams(searchParams)
  }

  const handleClearClick = () => {
    setFilters({
      number: '',
      status: '',
      combined_status: '',
    })
    Object.keys(filters).forEach((key) => searchParams.delete(key))
    setSearchParams(searchParams)
  }

  const handlePageChange = (newPage: number) => {
    searchParams.set('page', String(newPage))
    setSearchParams(searchParams)
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ready':
        return <Chip label="Ready" color="success" />
      case 'pending':
        return <Chip label="Pending" color="warning" />
      case 'cancelled':
        return <Chip label="Cancelled" color="error" />
      default:
        return <Chip label={status} />
    }
  }

  const pages = []
  for (let i = 1; i <= lastPage; i++) {
    pages.push(i)
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Orders
      </Typography>
      <Box sx={{ mb: 2 }}>
        <FilterWrapper>
          <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
            Filters
          </Typography>
          <Box style={{ display: 'flex', gap: 16, width: '100%' }}>
            <TextField
              label="Order Number"
              name="number"
              value={filters.number}
              onChange={handleFilterChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Ready">Ready</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Combined Status</InputLabel>
              <Select
                name="combined_status"
                value={filters.combined_status}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="ready_to_ship">Ready to Ship</MenuItem>
                <MenuItem value="ready_to_pick">Ready to Pick</MenuItem>
                <MenuItem value="fraud_hold">Fraud Hold</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              mt: 2,
              width: '100%',
            }}
          >
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
      </Box>
      <TableContainer component={Paper} style={{ padding: 16 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Order Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Ordered At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.attributes.number}</TableCell>
                <TableCell>
                  {getStatusBadge(order.attributes.status_text)}
                </TableCell>
                <TableCell>${order.attributes.total}</TableCell>
                <TableCell>
                  {new Date(order.attributes.ordered_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(order.attributes.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/orders/${order.id}`}
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
      </TableContainer>
    </Container>
  )
}
