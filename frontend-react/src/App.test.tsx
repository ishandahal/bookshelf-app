import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import * as api from './api'

vi.mock('./api')

function renderApp() {
  return render(
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

const mockBook = {
  id: 1,
  title: 'Dune',
  author: 'Frank Herbert',
  status: 'reading' as const,
  added_at: '2024-01-15T10:00:00',
}

describe('App', () => {
  beforeEach(() => {
    localStorage.setItem('bookshelf_token', 'test-token')
    vi.mocked(api.getBooks).mockResolvedValue([mockBook])
  })

  afterEach(() => localStorage.clear())

  it('shows the login form when not authenticated', () => {
    localStorage.clear()
    renderApp()

    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows a loading indicator while books are being fetched', () => {
    vi.mocked(api.getBooks).mockReturnValue(new Promise(() => {}))
    renderApp()

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('loads and displays books on mount', async () => {
    renderApp()

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Dune/ })).toBeInTheDocument()
    })
  })

  it('shows an error message when loading fails', async () => {
    vi.mocked(api.getBooks).mockRejectedValue(new Error('Network error'))
    renderApp()

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
    renderApp()

    await waitFor(() => screen.getByRole('heading', { name: /Dune/ }))

    await userEvent.type(screen.getByLabelText(/title/i), '1984')
    await userEvent.type(screen.getByLabelText(/author/i), 'George Orwell')
    await userEvent.click(screen.getByRole('button', { name: /add book/i }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /1984/ })).toBeInTheDocument()
    })
  })

  it('updates a book in the list when edited', async () => {
    vi.mocked(api.updateBook).mockResolvedValue()
    renderApp()

    await waitFor(() => screen.getByRole('heading', { name: /Dune/ }))

    await userEvent.click(screen.getByRole('button', { name: /edit/i }))

    const titleInput = screen.getByDisplayValue('Dune')
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Dune Messiah')
    await userEvent.click(screen.getByRole('button', { name: /save/i }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Dune Messiah/ })).toBeInTheDocument()
    })
  })

  it('removes a book from the list when deleted', async () => {
    vi.mocked(api.deleteBook).mockResolvedValue()
    renderApp()

    await waitFor(() => screen.getByRole('heading', { name: /Dune/ }))

    await userEvent.click(screen.getByRole('button', { name: /delete/i }))

    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Dune/ })).not.toBeInTheDocument()
    })
  })
})
