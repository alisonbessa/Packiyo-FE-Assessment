import { Box, styled } from '@mui/material'

export const HEADER_HEIGHT = '48px'

export const HeaderWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  padding: theme.spacing(2),
  height: HEADER_HEIGHT,
  boxShadow: theme.shadows[1],
  background: theme.palette.common.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))
