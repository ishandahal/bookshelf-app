import { render, screen } from '@testing-library/react'
import BookList from './BookList'
import type { Book } from '../types'

const testBooks: Book[] = [
  {
    id: 1,
    title: 'Dune',
    author: 'Frank Herbert',
    status: 'reading',
    added_at: '2024-01-15T10:00:00',
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    status: 'want-to-read',
    added_at: '2024-01-16T10:00:00',
  },
]

describe('BookList', () => {
  it('renders a card for each book', () => {
    render(<BookList books={testBooks} onDelete={() => {}} onUpdate={() => {}} />)

    expect(screen.getByRole('heading', { name: /Dune/ })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /1984/ })).toBeInTheDocument()
  })

  it('shows empty state when there are no books', () => {
    render(<BookList books={[]} onDelete={() => {}} onUpdate={() => {}} />)

    expect(screen.getByText(/no books yet/i)).toBeInTheDocument()
  })
})
