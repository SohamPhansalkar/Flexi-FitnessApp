import apiClient from './apiClient.js'

export const login = async (credentials) => {
  const response = await apiClient.post('/api/auth/login', credentials)
  return response.data
}

export const signup = async (payload) => {
  const response = await apiClient.post('/api/auth/signup', payload)
  return response.data
}
