
import { useCallback, useEffect, useMemo, useState } from 'react'
import { AuthContext } from './authContext'

import {
  fetchCurrentUser,
  loginRequest,
  registerRequest,
} from '../api/authApi'

import { UNAUTHORIZED_EVENT } from '../api/axiosClient'

import {
  clearToken,
  getToken,
  saveToken,
} from '../utils/tokenStorage'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(() => Boolean(getToken()))

  // Restore existing login session
  useEffect(() => {
    if (!getToken()) return undefined

    let cancelled = false

    fetchCurrentUser()
      .then((currentUser) => {
        if (!cancelled) setUser(currentUser)
      })
      .catch(() => {
        if (!cancelled) clearToken()
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  // Handle invalid or expired JWT
  useEffect(() => {
    const handleUnauthorized = () => setUser(null)

    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized)

    return () => {
      window.removeEventListener(
        UNAUTHORIZED_EVENT,
        handleUnauthorized
      )
    }
  }, [])

  // Login
  const login = useCallback(async (email, password) => {
    const { access_token: accessToken } =
      await loginRequest(email, password)

    saveToken(accessToken)

    try {
      const currentUser = await fetchCurrentUser()
      setUser(currentUser)
      return currentUser
    } catch (error) {
      clearToken()
      throw error
    }
  }, [])

  // Register and automatically login
  const register = useCallback(
    async ({ fullName, email, password }) => {
      await registerRequest({ fullName, email, password })
      return login(email, password)
    },
    [login],
  )

  // Logout
  const logout = useCallback(() => {
    clearToken()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
