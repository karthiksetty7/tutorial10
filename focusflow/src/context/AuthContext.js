import {createContext, useState, useEffect} from 'react'

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      // Optional: you can decode token or fetch user
      setUser({token})
    }
  }, [])

  const login = (token, userData) => {
    localStorage.setItem('token', token)
    setUser(userData || {token})
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
