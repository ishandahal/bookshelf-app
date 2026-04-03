import type { Book, BookUpdate } from '../types'
import BookCard from './BookCard'

interface BookListProps {
  books: Book[]
  onDelete: (id: number) => void
  onUpdate: (id: number, changes: BookUpdate) => void
}

function BookList({ books, onDelete, onUpdate }: BookListProps) {
  if (books.length === 0) {
    return <p className="empty-state">No books yet. Add one above!</p>
  }

  return (
    <div>
      {books.map(book => (
        <BookCard key={book.id} book={book} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  )
}

export default BookList
