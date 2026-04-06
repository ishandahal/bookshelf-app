import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from './AuthContext'
import * as api from '../api'

vi.mock('../api')

// A minimal component that exercises the context values
function TestConsumer() {
  const { isLoggedIn, login, logout } = useAuth()
  return (
    <div>
      <p>{isLoggedIn ? 'logged in' : 'logged out'}</p>
      <button onClick={() => login('alice', 'secret')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => localStorage.clear())

  it('starts logged out when there is no token', () => {
    render(<AuthProvider><TestConsumer /></AuthProvider>)

    expect(screen.getByText('logged out')).toBeInTheDocument()
  })

  it('starts logged in when a token exists in localStorage', () => {
    localStorage.setItem('bookshelf_token', 'existing-token')
    render(<AuthProvider><TestConsumer /></AuthProvider>)

    expect(screen.getByText('logged in')).toBeInTheDocument()
  })

  it('becomes logged in after a successful login', async () => {
    vi.mocked(api.login).mockResolvedValue('new-token')
    render(<AuthProvider><TestConsumer /></AuthProvider>)

    await userEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByText('logged in')).toBeInTheDocument()
    })
  })

  it('becomes logged out after logout', async () => {
    localStorage.setItem('bookshelf_token', 'existing-token')
    render(<AuthProvider><TestConsumer /></AuthProvider>)

    await userEvent.click(screen.getByRole('button', { name: /logout/i }))

    expect(screen.getByText('logged out')).toBeInTheDocument()
  })
})
