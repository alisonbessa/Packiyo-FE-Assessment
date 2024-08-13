import { Container, Typography, Button, Card, CardContent, CardMedia } from '@mui/material';
import { Link } from '@remix-run/react';
import type { ProductDetailsType } from './types';

interface ProductDetailsProps {
  product: ProductDetailsType;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { attributes } = product;
  const { sku, name, price, quantity_available, barcode, image, description, width, height, length, weight } = attributes;

  return (
    <Container>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        {name}
      </Typography>
      <Card variant="outlined" sx={{ mb: 2 }}>
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            SKU: {sku}
          </Typography>
          <Typography variant="body2">
            Price: ${price}
          </Typography>
          <Typography variant="body2">
            Quantity Available: {quantity_available}
          </Typography>
          <Typography variant="body2">
            Barcode: {barcode}
          </Typography>
          {description && (
            <Typography variant="body2">
              Description: {description}
            </Typography>
          )}
          {width && (
            <Typography variant="body2">
              Dimensions: {width}W x {height}H x {length}L cm
            </Typography>
          )}
          {weight && (
            <Typography variant="body2">
              Weight: {weight} kg
            </Typography>
          )}
        </CardContent>
      </Card>
      <Button variant="contained" component={Link} to="/products">
        Back to Products
      </Button>
    </Container>
  );
}
