import {
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
} from '@mui/material'
import { Link, useNavigate } from '@remix-run/react'
import type { OrderDetailsResponse } from './OrderDetails.types'
import { formatPrice } from '../../helpers/formatCurrency'

interface OrderDetailsProps {
  orderDetails: OrderDetailsResponse
}

export function OrderDetails({ orderDetails }: OrderDetailsProps) {
  const navigate = useNavigate()

  const { attributes, relationships } = orderDetails.data
  const customerInfo = orderDetails.included.find(
    (item) =>
      item.type === 'contact-informations' &&
      item.id === relationships.customer.data.id
  )

  const orderItems = orderDetails.included.filter(
    (item) => item.type === 'order-items'
  )

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

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Order Details - {attributes.number}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6">Order Information</Typography>
              <Typography>
                Status: {getStatusBadge(attributes.status_text)}
              </Typography>
            </Box>
            <Typography>
              Shipping: {formatPrice(attributes.shipping)}
            </Typography>
            <Typography>Tax: {formatPrice(attributes.tax)}</Typography>
            <Typography fontWeight="500" fontSize="1.125rem" mb="0.5rem">
              Total: {formatPrice(attributes.total)}
            </Typography>
            <Typography fontSize="0.875rem">
              Shipping Method: {attributes.shipping_method_name || 'N/A'}
            </Typography>
            <Typography fontSize="0.875rem">
              Ordered At: {new Date(attributes.ordered_at).toLocaleDateString()}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6">Customer Information</Typography>
            <Typography>
              Name: {customerInfo?.attributes.name || 'N/A'}
            </Typography>
            <Typography>
              Company: {customerInfo?.attributes.company_name || 'N/A'}
            </Typography>
            <Typography>
              Country: {customerInfo?.attributes.country || 'N/A'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6">Order Items</Typography>
            <List>
              {orderItems.map((item) => {
                return (
                  <ListItem
                    key={item.id}
                    button
                    component={Link}
                    to={`/products/${item.relationships.product.data.id}`}
                  >
                    <ListItemText
                      primary={`SKU: ${item.attributes.sku} - Quantity: ${item.attributes.quantity}`}
                      secondary={`Name: ${item.attributes.name || 'N/A'}`}
                    />
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 3 }}>
        Previous
      </Button>
    </Container>
  )
}
