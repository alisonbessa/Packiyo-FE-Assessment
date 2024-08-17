export interface ConfirmationModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}
