import React from 'react'
import { DialogActions, Button, Typography } from '@mui/material'
import { ConfirmationModalProps } from './ConfirmationModal.types'
import {
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from './ConfirmationModal.styles'

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent>
        <Typography variant="body1" paddingTop={2}>
          {message}
        </Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </StyledDialogActions>
    </StyledDialog>
  )
}
