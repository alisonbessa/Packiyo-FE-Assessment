import { Box, Typography } from '@mui/material'
import { HeaderWrapper } from './Header.styles'
import { AccountCircle, LocalShipping } from '@mui/icons-material'

export const Header = () => {
  return (
    <HeaderWrapper component="header">
      <Box display="flex" alignItems="center" gap={2}>
        <LocalShipping />
        <Typography>WMS Example</Typography>
      </Box>

      <Box display="flex" alignItems="center0">
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography lineHeight="100%" variant="subtitle1" fontWeight="bold">
            User Name
          </Typography>
          <Typography lineHeight="100%" variant="subtitle2">
            user.email@wms.com
          </Typography>
        </Box>
        <AccountCircle
          style={{ height: '48px', width: '48px', marginLeft: '0.5rem' }}
        />
      </Box>
    </HeaderWrapper>
  )
}
