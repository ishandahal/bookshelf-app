import type { Book } from '../types'

interface BookCardProps {
  book: Book
  onDelete: (id: number) => void
}

function BookCard({ book, onDelete }: BookCardProps) {
  const statusLabel = book.status.replace(/-/g, ' ')
  const addedDate = new Date(book.added_at).toLocaleDateString()

  return (
    <div className="book-card">
      <h3>
        {book.title} <span className={`badge ${book.status}`}>{statusLabel}</span>
      </h3>
      <p className="author">by {book.author}</p>

      {book.genre && <p><strong>Genre:</strong> {book.genre}</p>}
      {book.notes && <p><strong>Notes:</strong> {book.notes}</p>}
      {book.source && <p><strong>Source:</strong> {book.source}</p>}

      <p><strong>Added:</strong> {addedDate}</p>

      <button className="delete-btn" onClick={() => onDelete(book.id)}>Delete</button>
    </div>
  )
}

export default BookCard
