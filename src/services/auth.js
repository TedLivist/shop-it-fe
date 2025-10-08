import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
})

api.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('token');
  if(authToken) {
    config.headers.Authorization = `${authToken}`
  }
  return config
})

api.interceptors.response.use((response) => response, (error) => {
  if(error.response?.status === 401) {
    localStorage.removeItem('token')
    window.location.href = "/login"
  }
  return Promise.reject(error)
})

export const auth = {
  login: async (email, password) => {
    const response = await api.post('/user/sign_in', { user: { email, password } })
    const { token } = response.data
    localStorage.setItem('token', token)
    return response.data;
  },

  signup: async (firstName, lastName, email, password, passwordConfirmation, userRole) => {
    const response = await api.post('/user/sign_up', {
      user: { first_name: firstName, last_name: lastName, email, password, password_confirmation: passwordConfirmation, user_role: userRole } })
    const data = response.data
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token')
  }
}

export default api