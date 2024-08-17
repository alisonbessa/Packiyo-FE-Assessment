import { styled } from '@mui/material/styles'
import { Box, ListItem } from '@mui/material'
import { HEADER_HEIGHT } from '../Header/Header.styles'

export const EXPANDED_SIDEBAR_WIDTH = '220px'
export const HIDEN_SIDEBAR_WIDTH = '60px'

export const SidebarContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed: boolean }>(({ theme, collapsed }) => ({
  position: 'fixed',
  marginTop: HEADER_HEIGHT,
  width: collapsed ? HIDEN_SIDEBAR_WIDTH : EXPANDED_SIDEBAR_WIDTH,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  transition: 'width 0.3s ease',
  overflow: 'hidden',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
}))

export const SidebarItem = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== 'collapsed',
})<{ collapsed: boolean }>(({ collapsed }) => ({
  cursor: 'pointer',
  width: '100%',
  display: 'flex',
  justifyContent: collapsed ? 'center' : 'flex-start',
  paddingLeft: '1rem',
}))
