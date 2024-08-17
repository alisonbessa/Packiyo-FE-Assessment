import React, { useState, useEffect } from 'react'
import { Modal, Box, TextField, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useFetcher } from '@remix-run/react'

const ModalContainer = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 600,
  backgroundColor: 'white',
  padding: '2rem',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
})

type ProductModalProps = {
  open: boolean
  onClose: () => void
  mode: 'create' | 'edit'
  product: {
    sku?: string
    name?: string
    barcode?: string
    price?: string
    cost?: string
  }
}

export const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  mode,
  product = {},
}) => {
  const fetcher = useFetcher()
  const [formData, setFormData] = useState({
    sku: product.sku || '',
    name: product.name || '',
    barcode: product.barcode || '',
    price: product.price || '',
    cost: product.cost || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const method = mode === 'create' ? 'POST' : 'PATCH'
    const formDataToSubmit = new FormData()

    formDataToSubmit.append('sku', formData.sku)
    formDataToSubmit.append('name', formData.name)
    formDataToSubmit.append('barcode', formData.barcode)
    formDataToSubmit.append('price', formData.price)
    formDataToSubmit.append('cost', formData.cost)

    const response = await fetcher.submit(formDataToSubmit, {
      method,
      action: '/api/createProduct',
    })
    console.log({ response })
    // Handle successful responseonClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer>
        <Typography variant="h6" gutterBottom>
          {mode === 'create' ? 'Create New Product' : 'Edit Product'}
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Barcode"
            name="barcode"
            value={formData.barcode}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cost"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {mode === 'create' ? 'Create' : 'Save'}
          </Button>
        </Box>
      </ModalContainer>
    </Modal>
  )
}
