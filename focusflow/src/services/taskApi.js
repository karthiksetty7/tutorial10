import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
})

// ✅ Attach token without mutating config
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')

    return {
      ...config,
      headers: {
        ...config.headers,
        ...(token ? {Authorization: `Bearer ${token}`} : {}),
      },
    }
  },
  error => Promise.reject(error),
)

// ✅ Auto logout on 401
API.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default API
