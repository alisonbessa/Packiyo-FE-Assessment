import * as React from 'react'
import { Sidebar } from '../Sidebar'
import { Box } from '@mui/material'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box component="main" flex="1" padding="20px">
        {children}
      </Box>
    </Box>
  )
}
