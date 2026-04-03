import type { Book, NewBook, BookUpdate } from './types'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function apiFetch<T>(
  path: string,
  options: { method?: string; body?: unknown } = {}
): Promise<T> {
  const headers: Record<string, string> = {}
  if (options.body) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_BASE}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    const message = (errorData?.detail as string) ?? `Request failed (${response.status})`
    throw new Error(message)
  }

  if (response.status === 204) {
    return null as T
  }

  return response.json() as Promise<T>
}

export async function getBooks(): Promise<Book[]> {
  return apiFetch<Book[]>('/books')
}

export async function addBook(book: NewBook): Promise<Book> {
  const { id } = await apiFetch<{ id: number }>('/books', { method: 'POST', body: book })
  return {
    id,
    added_at: new Date().toISOString(),
    ...book,
  }
}

export async function updateBook(id: number, changes: BookUpdate): Promise<void> {
  return apiFetch<void>(`/books/${id}`, { method: 'PATCH', body: changes })
}

export async function deleteBook(id: number): Promise<void> {
  return apiFetch<void>(`/books/${id}`, { method: 'DELETE' })
}
