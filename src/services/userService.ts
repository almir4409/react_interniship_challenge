import axios from 'axios'
import type { User } from '../types/user'

const BASE_URL = "https://jsonplaceholder.typicode.com";


const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
})


// REQUEST interceptor
// runs on EVERY request before it goes out
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


// RESPONSE interceptor
// runs on EVERY response before it reaches our code
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // handle errors globally in ONE place
    if (error.response?.status === 404) {
      console.error('Resource not found')
    } else if (error.response?.status === 500) {
      console.error('Server error')
    } else if (error.code === 'ECONNABORTED') {
      console.error('Request timed out')
    }
    return Promise.reject(error)
  }
)


// the ONLY function that fetches users
// clean, simple, one job
export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users')
  return response.data
}

// get single user by id
export const fetchUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`)
  return response.data
}