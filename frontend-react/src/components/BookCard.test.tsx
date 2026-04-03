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

describe('BookCard', () => {
  it('renders title and author', () => {
    render(<BookCard book={testBook} onDelete={() => {}} />)

    expect(screen.getByRole('heading', { name: /Dune/ })).toBeInTheDocument()
    expect(screen.getByText(/Frank Herbert/)).toBeInTheDocument()
  })

  it('renders optional fields when present', () => {
    render(<BookCard book={testBook} onDelete={() => {}} />)

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
    render(<BookCard book={minimalBook} onDelete={() => {}} />)

    expect(screen.queryByText(/Genre/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Notes/)).not.toBeInTheDocument()
    expect(screen.queryByText(/Source/)).not.toBeInTheDocument()
  })

  it('calls onDelete with the book id when Delete is clicked', async () => {
    const handleDelete = vi.fn()
    render(<BookCard book={testBook} onDelete={handleDelete} />)

    await userEvent.click(screen.getByRole('button', { name: /delete/i }))

    expect(handleDelete).toHaveBeenCalledWith(1)
  })
})
