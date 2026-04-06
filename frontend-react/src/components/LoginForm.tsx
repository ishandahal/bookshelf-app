import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ErrorMessage from './ErrorMessage'

function LoginForm() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      await login(username, password)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="login-container">
      <h1>Bookshelf</h1>
      <form onSubmit={handleSubmit}>
        <h2>Sign in</h2>

        <ErrorMessage message={error} />

        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign in</button>
      </form>
    </div>
  )
}

export default LoginForm
