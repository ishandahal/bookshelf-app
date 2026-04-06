import { createContext, useContext, useState } from 'react'
import { login as apiLogin } from '../api'
import { getToken, removeToken, setToken } from '../auth'

interface AuthContextValue {
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!getToken())

  async function login(username: string, password: string) {
    const token = await apiLogin(username, password)
    setToken(token)
    setIsLoggedIn(true)
  }

  function logout() {
    removeToken()
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
