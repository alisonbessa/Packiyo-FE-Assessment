import { Box, Button, styled } from '@mui/material'

export const FilterWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: '#fff',
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
}))

export const FilterButtons = styled(Button)(({ theme }) => ({
  paddingInline: theme.spacing(6),
}))
