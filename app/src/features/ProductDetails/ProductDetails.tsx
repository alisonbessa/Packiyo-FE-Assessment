import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Box,
} from '@mui/material'
import { useNavigate } from '@remix-run/react'
import type { ProductDetailsType } from './types'
import { formatPrice } from '../../helpers/formatCurrency'

interface ProductDetailsProps {
  product: ProductDetailsType
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const navigate = useNavigate()

  const { attributes } = product
  const {
    sku,
    name,
    price,
    quantity_available,
    barcode,
    image,
    description,
    width,
    height,
    length,
    weight,
  } = attributes

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            sx={{
              display: 'flex',
              mb: 2,
            }}
            variant="outlined"
          >
            <CardMedia
              component="img"
              height="300"
              width="300"
              image={image || 'https://via.placeholder.com/300'}
              alt={name}
            />
            <CardContent
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography variant="h4" component="div">
                  {name}
                </Typography>
                <Typography sx={{ mb: 0.5 }} color="text.secondary">
                  SKU: <strong>{sku}</strong>
                </Typography>
                <Typography sx={{ mb: 0.5 }} variant="body2">
                  Quantity Available: <strong>{quantity_available}</strong>
                </Typography>
                <Typography sx={{ mb: 0.5 }} variant="body2">
                  Barcode: <strong>{barcode}</strong>
                </Typography>
                {description && (
                  <Typography style={{ padding: 16 }} variant="body2">
                    Description: <strong>{description}</strong>
                  </Typography>
                )}
              </Box>
              <Box style={{ padding: 2 }}>
                <Typography variant="h3">
                  <strong>{formatPrice(price)}</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Technical Details
            </Typography>
            {width || height || length ? (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Dimensions:</strong> {width}W x {height}H x {length}L cm
              </Typography>
            ) : null}
            {weight ? (
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Weight:</strong> {weight} kg
              </Typography>
            ) : null}
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Created At:</strong>{' '}
              {new Date(attributes.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="body2">
              <strong>Last Updated:</strong>{' '}
              {new Date(attributes.updated_at).toLocaleDateString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Button variant="contained" onClick={() => navigate(-1)} sx={{ mt: 3 }}>
        Previous
      </Button>
    </Container>
  )
}
