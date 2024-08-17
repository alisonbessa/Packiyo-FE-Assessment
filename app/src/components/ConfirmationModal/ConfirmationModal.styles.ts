import { styled } from '@mui/material/styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiDialogActions-root': {
    justifyContent: 'flex-end',
  },
}))

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontWeight: 'bold',
  padding: theme.spacing(2),
}))

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(2),
}))

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(2),
}))
