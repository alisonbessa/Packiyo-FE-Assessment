import { Box, Button, styled } from '@mui/material'

export const FilterWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  display: 'flex',
  gap: '1rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
}))

export const FilterButtonWrapper = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}))

export const FilterButtons = styled(Button)(({ theme }) => ({
  minWidth: '80px',
}))
