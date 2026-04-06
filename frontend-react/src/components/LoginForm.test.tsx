import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider } from '../context/AuthContext'
import * as api from '../api'
import LoginForm from './LoginForm'

vi.mock('../api')

function renderWithAuth() {
  return render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
}

describe('LoginForm', () => {
  beforeEach(() => localStorage.clear())

  it('renders username and password fields', () => {
    renderWithAuth()

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
  })

  it('calls login with username and password on submit', async () => {
    vi.mocked(api.login).mockResolvedValue('token')
    renderWithAuth()

    await userEvent.type(screen.getByLabelText(/username/i), 'alice')
    await userEvent.type(screen.getByLabelText(/password/i), 'secret')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(api.login).toHaveBeenCalledWith('alice', 'secret')
  })

  it('shows an error message when login fails', async () => {
    vi.mocked(api.login).mockRejectedValue(new Error('Incorrect username or password'))
    renderWithAuth()

    await userEvent.type(screen.getByLabelText(/username/i), 'alice')
    await userEvent.type(screen.getByLabelText(/password/i), 'wrong')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => {
      expect(screen.getByText(/incorrect username or password/i)).toBeInTheDocument()
    })
  })
})
