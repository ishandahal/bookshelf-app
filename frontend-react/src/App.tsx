import BookList from './components/BookList'
import AddBookForm from './components/AddBookForm'
import type { Book, NewBook } from './types'

const testBooks: Book[] = [
  {
    id: 1,
    title: 'Dune',
    author: 'Frank Herbert',
    status: 'reading',
    genre: 'sci-fi',
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

function App() {
  function handleDelete(id: number) {
    console.log('Delete clicked for book id:', id)
  }

  function handleAdd(book: NewBook) {
    console.log('Add book:', book)
  }

  return (
    <div>
      <h1>Bookshelf</h1>
      <AddBookForm onAdd={handleAdd} />
      <BookList books={testBooks} onDelete={handleDelete} />
    </div>
  )
}

export default App
