import { render, screen } from '@testing-library/react'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  it('renders nothing when message is null', () => {
    const { container } = render(<ErrorMessage message={null} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders the error message when present', () => {
    render(<ErrorMessage message="Network error" />)

    expect(screen.getByText(/Network error/)).toBeInTheDocument()
  })

  it('renders with the error class for styling', () => {
    render(<ErrorMessage message="Something went wrong" />)

    expect(screen.getByRole('alert')).toHaveClass('error')
  })
})
