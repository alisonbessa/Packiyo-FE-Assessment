import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Link } from '@remix-run/react';
import { ProductCardProps } from './productCard.types';

export function ProductCard({ product }: ProductCardProps) {
  const { id, attributes } = product;
  const { sku, name, price, quantity_available, barcode, image } = attributes;

  return (
    <Card variant="outlined" sx={{ minWidth: 275, mb: 2 }}>
      <CardMedia
        component="img"
        height="140"
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
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" component={Link} to={`/products/${id}`}>
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
