import * as React from 'react'
import { Sidebar } from '../Sidebar'
import { Box } from '@mui/material'
import { Header } from '../Header'
import { useState } from 'react'
import {
  EXPANDED_SIDEBAR_WIDTH,
  HIDEN_SIDEBAR_WIDTH,
} from '../Sidebar/Sidebar.styles'
import { HEADER_HEIGHT } from '../Header/Header.styles'

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev)
  }

  const leftMargin = sidebarCollapsed
    ? HIDEN_SIDEBAR_WIDTH
    : EXPANDED_SIDEBAR_WIDTH

  return (
    <Box display="flex" height="100vh">
      <Sidebar collapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      <Box display="flex" flexDirection="column" width="100%">
        <Header />
        <Box
          component="main"
          sx={{
            flex: '1',
            padding: '20px',
            width: `calc(100% - ${leftMargin})`,
            marginTop: HEADER_HEIGHT,
            marginLeft: leftMargin,
            transition: 'margin-left 0.3s ease',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
