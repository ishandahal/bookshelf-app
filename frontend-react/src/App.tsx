import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import AddBookForm from './components/AddBookForm'
import BookList from './components/BookList'
import ErrorMessage from './components/ErrorMessage'
import LoginForm from './components/LoginForm'
import { getBooks, addBook, updateBook, deleteBook } from './api'
import type { Book, NewBook, BookUpdate } from './types'

function App() {
  const { isLoggedIn, logout } = useAuth()

  const [books, setBooks] = useState<Book[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoggedIn) return
    getBooks()
      .then(setBooks)
      .catch((err: Error) => setError(err.message))
      .finally(() => setIsLoading(false))
  }, [isLoggedIn])

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

  if (!isLoggedIn) {
    return <LoginForm />
  }

  return (
    <div className="app">
      <div className="app-header">
        <h1>Bookshelf</h1>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
      <ErrorMessage message={error} />
      <AddBookForm onAdd={handleAdd} />
      {isLoading
        ? <p className="loading">Loading your books...</p>
        : <BookList books={books} onDelete={handleDelete} onUpdate={handleUpdate} />
      }
    </div>
  )
}

export default App
