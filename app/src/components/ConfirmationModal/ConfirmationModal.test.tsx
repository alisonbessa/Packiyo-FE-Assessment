import { render, screen, fireEvent } from '@testing-library/react'
import { ConfirmationModal } from './ConfirmationModal'

describe('ConfirmationModal', () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: 'Confirm Action',
    message: 'Are you sure you want to proceed?',
  }

  it('renders modal with title and message', () => {
    render(<ConfirmationModal {...defaultProps} />)
    expect(screen.getByText('Confirm Action')).toBeInTheDocument()
    expect(
      screen.getByText('Are you sure you want to proceed?')
    ).toBeInTheDocument()
  })

  it('calls onClose when cancel button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />)
    fireEvent.click(screen.getByText('Cancel'))
    expect(defaultProps.onClose).toHaveBeenCalled()
  })

  it('calls onConfirm when confirm button is clicked', () => {
    render(<ConfirmationModal {...defaultProps} />)
    fireEvent.click(screen.getByText('Confirm'))
    expect(defaultProps.onConfirm).toHaveBeenCalled()
  })
})
