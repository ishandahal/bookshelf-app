import BookList from './components/BookList'
import type { Book } from './types'

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

  return (
    <div>
      <h1>Bookshelf</h1>
      <BookList books={testBooks} onDelete={handleDelete} />
    </div>
  )
}

export default App
