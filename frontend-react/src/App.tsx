import { useState, useEffect } from 'react'
import AddBookForm from './components/AddBookForm'
import BookList from './components/BookList'
import { getBooks, addBook, updateBook, deleteBook } from './api'
import type { Book, NewBook, BookUpdate } from './types'

function App() {
  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch((err: Error) => setError(err.message))
  }, [])

  async function handleAdd(newBook: NewBook) {
    try {
      const created = await addBook(newBook)
      setBooks([...books, created])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add book')
    }
  }

  async function handleUpdate(id: number, changes: BookUpdate) {
    try {
      await updateBook(id, changes)
      setBooks(books.map(b => b.id === id ? { ...b, ...changes } : b))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update book')
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteBook(id)
      setBooks(books.filter(b => b.id !== id))
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete book')
    }
  }

  return (
    <div className="app">
      <h1>Bookshelf</h1>
      {error && <p className="error">{error}</p>}
      <AddBookForm onAdd={handleAdd} />
      <BookList books={books} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  )
}

export default App
