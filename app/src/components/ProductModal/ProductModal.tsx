import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useFetcher } from '@remix-run/react'
import { ProductsProps } from '~/src/features/Products/Products.types'
import { LoadingOverlay } from '../LoadingOverlay'

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
  customers: ProductsProps['customers']
  product?: {
    id?: string
    sku?: string
    name?: string
    barcode?: string
    price?: string
    value?: string
    customerId?: string
  }
}

export const ProductModal: React.FC<ProductModalProps> = ({
  open,
  onClose,
  mode,
  customers,
  product = {},
}) => {
  const fetcher = useFetcher()

  const defaultFormData = {
    sku: '',
    name: '',
    barcode: '',
    price: '',
    value: '',
    customerId: '',
  }

  const prevProductRef = useRef(product)

  const [formData, setFormData] = useState(defaultFormData)

  useEffect(() => {
    if (prevProductRef.current !== product && mode === 'edit') {
      setFormData({
        sku: product.sku || '',
        name: product.name || '',
        barcode: product.barcode || '',
        price: product.price || '',
        value: product.value || '',
        customerId: product.customerId || '',
      })
      prevProductRef.current = product
    } else {
      setFormData(defaultFormData)
    }
  }, [product])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCustomerChange = (e: SelectChangeEvent<string>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value as string })
  }

  const handleSubmit = async () => {
    const method = mode === 'create' ? 'POST' : 'PATCH'

    const formDataToSubmit = new FormData()

    formDataToSubmit.append('sku', formData.sku)
    formDataToSubmit.append('name', formData.name)
    formDataToSubmit.append('barcode', formData.barcode)
    formDataToSubmit.append('price', formData.price)
    formDataToSubmit.append('value', formData.value)
    formDataToSubmit.append('customerId', formData.customerId)

    if (product.id) {
      formDataToSubmit.append('productId', product.id)
    }

    await fetcher.submit(formDataToSubmit, {
      method,
      action: '/api/manageProduct',
    })

    onClose()
  }

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success) {
      const currentUrl = window.location.pathname + window.location.search
      fetcher.load(currentUrl)
    }
  }, [fetcher.state, fetcher.data])

  return (
    <>
      {fetcher.state !== 'idle' && <LoadingOverlay />}
      <Modal open={open} onClose={onClose}>
        <ModalContainer>
          <Typography variant="h6" gutterBottom>
            {mode === 'create' ? 'Create New Product' : 'Edit Product'}
          </Typography>
          <Box component="form" noValidate autoComplete="off">
            <FormControl fullWidth margin="normal">
              <InputLabel id="customer-label">Customer</InputLabel>
              <Select
                name="customerId"
                labelId="customer-label"
                value={formData.customerId}
                onChange={handleCustomerChange}
                label="Customer"
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              label="Value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Box width="100%" display="flex" justifyContent="flex-end" mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                {mode === 'create' ? 'Create' : 'Save'}
              </Button>
            </Box>
          </Box>
        </ModalContainer>
      </Modal>
    </>
  )
}
