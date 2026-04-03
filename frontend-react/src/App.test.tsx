import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import * as api from './api'

vi.mock('./api')

const mockBook = {
  id: 1,
  title: 'Dune',
  author: 'Frank Herbert',
  status: 'reading' as const,
  added_at: '2024-01-15T10:00:00',
}

describe('App', () => {
  beforeEach(() => {
    vi.mocked(api.getBooks).mockResolvedValue([mockBook])
  })

  it('loads and displays books on mount', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Dune/ })).toBeInTheDocument()
    })
  })

  it('shows an error message when loading fails', async () => {
    vi.mocked(api.getBooks).mockRejectedValue(new Error('Network error'))
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Network error/)).toBeInTheDocument()
    })
  })

  it('adds a new book and displays it in the list', async () => {
    const newBook = {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      status: 'want-to-read' as const,
      added_at: '2024-01-16T10:00:00',
    }
    vi.mocked(api.addBook).mockResolvedValue(newBook)
    render(<App />)

    await waitFor(() => screen.getByRole('heading', { name: /Dune/ }))

    await userEvent.type(screen.getByLabelText(/title/i), '1984')
    await userEvent.type(screen.getByLabelText(/author/i), 'George Orwell')
    await userEvent.click(screen.getByRole('button', { name: /add book/i }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /1984/ })).toBeInTheDocument()
    })
  })

  it('removes a book from the list when deleted', async () => {
    vi.mocked(api.deleteBook).mockResolvedValue()
    render(<App />)

    await waitFor(() => screen.getByRole('heading', { name: /Dune/ }))

    await userEvent.click(screen.getByRole('button', { name: /delete/i }))

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Dune/ })).not.toBeInTheDocument()
    })
  })
})
