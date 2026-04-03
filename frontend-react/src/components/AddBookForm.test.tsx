import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBookForm from './AddBookForm'

describe('AddBookForm', () => {
  it('renders title and author fields', () => {
    render(<AddBookForm onAdd={() => {}} />)

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/author/i)).toBeInTheDocument()
  })

  it('calls onAdd with form data when submitted', async () => {
    const handleAdd = vi.fn()
    render(<AddBookForm onAdd={handleAdd} />)

    await userEvent.type(screen.getByLabelText(/title/i), 'Dune')
    await userEvent.type(screen.getByLabelText(/author/i), 'Frank Herbert')
    await userEvent.click(screen.getByRole('button', { name: /add book/i }))

    expect(handleAdd).toHaveBeenCalledWith({
      title: 'Dune',
      author: 'Frank Herbert',
      status: 'want-to-read',
    })
  })

  it('clears the form after submission', async () => {
    render(<AddBookForm onAdd={() => {}} />)

    const titleInput = screen.getByLabelText(/title/i)
    await userEvent.type(titleInput, 'Dune')
    await userEvent.type(screen.getByLabelText(/author/i), 'Frank Herbert')
    await userEvent.click(screen.getByRole('button', { name: /add book/i }))

    expect(titleInput).toHaveValue('')
  })
})
