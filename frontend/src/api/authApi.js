
import apiClient from './axiosClient'

export async function loginRequest(email, password) {
  const { data } = await apiClient.post('/auth/login', {
    email,
    password,
  })

  return data
}

export async function registerRequest({ fullName, email, password }) {
  const { data } = await apiClient.post('/auth/register', {
    full_name: fullName,
    email,
    password,
  })

  return data
}

export async function fetchCurrentUser() {
  const { data } = await apiClient.get('/auth/me')
  return data
}
