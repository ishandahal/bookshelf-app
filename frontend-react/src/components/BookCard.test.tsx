import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookCard from './BookCard'
import type { Book } from '../types'

const testBook: Book = {
  id: 1,
  title: 'Dune',
  author: 'Frank Herbert',
  status: 'reading',
  genre: 'sci-fi',
  notes: 'Amazing world building',
  source: 'Reddit',
  added_at: '2024-01-15T10:00:00',
}

describe('BookCard — view mode', () => {
  it('renders title and author', () => {
    render(<BookCard book={testBook} onDelete={() => {}} onUpdate={() => {}} />)

    expect(screen.getByRole('heading', { name: /Dune/ })).toBeInTheDocument()
    expect(screen.getByText(/Frank Herbert/)).toBeInTheDocument()
  })

  it('renders optional fields when present', () => {
    render(<BookCard book={testBook} onDelete={() => {}} onUpdate={() => {}} />)

    expect(screen.getByText(/sci-fi/)).toBeInTheDocument()
    expect(screen.getByText(/Amazing world building/)).toBeInTheDocument()
    expect(screen.getByText(/Reddit/)).toBeInTheDocument()
  })

  it('does not render optional fields when absent', () => {
    const minimalBook: Book = {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      status: 'want-to-read',
      added_at: '2024-01-15T10:00:00',
    }
    render(<BookCard book={minimalBook} onDelete={() => {}} onUpdate={() => {}} />)

    expect(screen.queryByText(/Genre/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Notes/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Source/)).not.toBeInTheDocument()
  })

  it('calls onDelete with the book id when Delete is clicked', async () => {
    const handleDelete = vi.fn()
    render(<BookCard book={testBook} onDelete={handleDelete} onUpdate={() => {}} />)

    await userEvent.click(screen.getByRole('button', { name: /delete/i }))

    expect(handleDelete).toHaveBeenCalledWith(1)
  })
})

describe('BookCard — edit mode', () => {
  it('shows an Edit button in view mode', () => {
    render(<BookCard book={testBook} onDelete={() => {}} onUpdate={() => {}} />)

    expect(screen.getByRole('button', { name: /edit/i })).toBeInTheDocument()
  })

  it('switches to an edit form when Edit is clicked', async () => {
    render(<BookCard book={testBook} onDelete={() => {}} onUpdate={() => {}} />)

    await userEvent.click(screen.getByRole('button', { name: /edit/i }))

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument()
  })

  it('pre-fills the edit form with the current book values', async () => {
    render(<BookCard book={testBook} onDelete={() => {}} onUpdate={() => {}} />)

    await userEvent.click(screen.getByRole('button', { name: /edit/i }))

    expect(screen.getByDisplayValue('Dune')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Frank Herbert')).toBeInTheDocument()
    expect(screen.getByDisplayValue('sci-fi')).toBeInTheDocument()
  })

  it('returns to view mode when Cancel is clicked', async () => {
    render(<BookCard book={testBook} onDelete={() => {}} onUpdate={() => {}} />)

    await userEvent.click(screen.getByRole('button', { name: /edit/i }))
    await userEvent.click(screen.getByRole('button', { name: /cancel/i }))

    expect(screen.getByRole('heading', { name: /Dune/ })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /save/i })).not.toBeInTheDocument()
  })

  it('calls onUpdate with the changed values when Save is clicked', async () => {
    const handleUpdate = vi.fn()
    render(<BookCard book={testBook} onDelete={() => {}} onUpdate={handleUpdate} />)

    await userEvent.click(screen.getByRole('button', { name: /edit/i }))

    const titleInput = screen.getByDisplayValue('Dune')
    await userEvent.clear(titleInput)
    await userEvent.type(titleInput, 'Dune Messiah')

    await userEvent.click(screen.getByRole('button', { name: /save/i }))

    expect(handleUpdate).toHaveBeenCalledWith(1, expect.objectContaining({
      title: 'Dune Messiah',
      author: 'Frank Herbert',
    }))
  })
})
