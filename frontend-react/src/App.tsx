import BookCard from './components/BookCard'
import type { Book } from './types'

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

function App() {
	function handleDelete(id: number) {
		console.log('Delete clicked for book id:', id)
	}

	return (
		<div>
			<h1>Bookshelf</h1>
			<BookCard book={testBook} onDelete={handleDelete} />
		</div>
	)
}

export default App
