import { getToken, removeToken, setToken } from './auth'

describe('auth token helpers', () => {
  beforeEach(() => localStorage.clear())

  it('getToken returns null when nothing is stored', () => {
    expect(getToken()).toBeNull()
  })

  it('setToken stores a token retrievable by getToken', () => {
    setToken('abc123')
    expect(getToken()).toBe('abc123')
  })

  it('removeToken clears the stored token', () => {
    setToken('abc123')
    removeToken()
    expect(getToken()).toBeNull()
  })
})
