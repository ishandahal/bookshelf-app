import { useState } from 'react'
import type { Book, BookUpdate } from '../types'

interface BookCardProps {
  book: Book
  onDelete: (id: number) => void
  onUpdate: (id: number, changes: BookUpdate) => void
}

function BookCard({ book, onDelete, onUpdate }: BookCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({
    title:  book.title,
    author: book.author,
    status: book.status,
    genre:  book.genre  ?? '',
    notes:  book.notes  ?? '',
    source: book.source ?? '',
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setDraft({ ...draft, [name]: value })
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    onUpdate(book.id, {
      title:  draft.title,
      author: draft.author,
      status: draft.status,
      ...(draft.genre  && { genre:  draft.genre }),
      ...(draft.notes  && { notes:  draft.notes }),
      ...(draft.source && { source: draft.source }),
    })
    setIsEditing(false)
  }

  function handleCancel() {
    setDraft({
      title:  book.title,
      author: book.author,
      status: book.status,
      genre:  book.genre  ?? '',
      notes:  book.notes  ?? '',
      source: book.source ?? '',
    })
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="book-card">
        <form onSubmit={handleSave}>
          <input name="title"  value={draft.title}  onChange={handleChange} required />
          <input name="author" value={draft.author} onChange={handleChange} required />

          <select name="status" value={draft.status} onChange={handleChange}>
            <option value="want-to-read">Want to Read</option>
            <option value="reading">Reading</option>
            <option value="read">Read</option>
          </select>

          <input name="genre"  value={draft.genre}  onChange={handleChange} placeholder="Genre" />
          <textarea name="notes"  value={draft.notes}  onChange={handleChange} placeholder="Notes" rows={2} />
          <input name="source" value={draft.source} onChange={handleChange} placeholder="Source" />

          <div className="edit-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    )
  }

  const statusLabel = book.status.replace(/-/g, ' ')
  const addedDate = new Date(book.added_at).toLocaleDateString()

  return (
    <div className="book-card">
      <h3>
        {book.title} <span className={`badge ${book.status}`}>{statusLabel}</span>
      </h3>
      <p className="author">by {book.author}</p>

      {book.genre  && <p><strong>Genre:</strong>  {book.genre}</p>}
      {book.notes  && <p><strong>Notes:</strong>  {book.notes}</p>}
      {book.source && <p><strong>Source:</strong> {book.source}</p>}

      <p><strong>Added:</strong> {addedDate}</p>

      <div className="card-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(book.id)}>Delete</button>
      </div>
    </div>
  )
}

export default BookCard
