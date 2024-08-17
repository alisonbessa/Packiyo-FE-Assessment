import { FunctionComponent } from 'react'
import {
  Box,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  Dashboard,
  Inventory,
  ListAlt,
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from '@mui/icons-material'
import { useNavigate } from '@remix-run/react'
import { SidebarContainer, SidebarItem } from './Sidebar.styles'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export const Sidebar: FunctionComponent<SidebarProps> = ({
  collapsed,
  onToggle,
}) => {
  const navigate = useNavigate()

  const pages = [
    { icon: <Dashboard />, label: 'Summary', path: '/' },
    { icon: <Inventory />, label: 'Products', path: '/products' },
    { icon: <ListAlt />, label: 'Orders', path: '/orders' },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <SidebarContainer collapsed={collapsed} data-testid="sidebar-container">
      <Box display="flex" justifyContent="flex-end" p={1}>
        <IconButton onClick={onToggle}>
          {collapsed ? (
            <KeyboardDoubleArrowRight />
          ) : (
            <KeyboardDoubleArrowLeft />
          )}
        </IconButton>
      </Box>
      <List>
        {pages.map((page) => (
          <SidebarItem
            key={page.label}
            onClick={() => handleNavigation(page.path)}
            collapsed={collapsed}
          >
            <ListItemIcon style={{ minWidth: 0 }}>{page.icon}</ListItemIcon>
            {!collapsed && (
              <ListItemText
                style={{ margin: '0 0 0 1rem' }}
                primary={page.label}
              />
            )}
          </SidebarItem>
        ))}
      </List>
    </SidebarContainer>
  )
}
