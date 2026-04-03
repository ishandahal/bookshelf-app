export type Status = 'want-to-read' | 'reading' | 'read'

export interface Book {
  id: number
  title: string
  author: string
  status: Status
  genre?: string
  notes?: string
  source?: string
  added_at: string
}
