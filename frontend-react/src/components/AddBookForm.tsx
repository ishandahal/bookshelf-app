import { useState } from 'react'
import type { NewBook } from '../types'

interface AddBookFormProps {
  onAdd: (book: NewBook) => void
}

const emptyForm: NewBook = {
  title: '',
  author: '',
  status: 'want-to-read',
}

function AddBookForm({ onAdd }: AddBookFormProps) {
  const [formData, setFormData] = useState<NewBook>(emptyForm)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Build payload — omit optional fields if empty
    const payload: NewBook = {
      title: formData.title,
      author: formData.author,
      status: formData.status,
      ...(formData.genre  && { genre:  formData.genre }),
      ...(formData.notes  && { notes:  formData.notes }),
      ...(formData.source && { source: formData.source }),
    }

    onAdd(payload)
    setFormData(emptyForm)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add a Book</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />

      <label htmlFor="author">Author</label>
      <input
        id="author"
        name="author"
        value={formData.author}
        onChange={handleChange}
        required
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="want-to-read">Want to Read</option>
        <option value="reading">Reading</option>
        <option value="read">Read</option>
      </select>

      <label htmlFor="genre">Genre</label>
      <input
        id="genre"
        name="genre"
        value={formData.genre ?? ''}
        onChange={handleChange}
      />

      <label htmlFor="notes">Notes</label>
      <textarea
        id="notes"
        name="notes"
        value={formData.notes ?? ''}
        onChange={handleChange}
        rows={3}
      />

      <label htmlFor="source">Source</label>
      <input
        id="source"
        name="source"
        value={formData.source ?? ''}
        onChange={handleChange}
      />

      <button type="submit">Add Book</button>
    </form>
  )
}

export default AddBookForm
