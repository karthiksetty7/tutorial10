import {useState, useContext} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {lightTheme, darkTheme} from './styles/theme'
import GlobalStyles from './styles/GlobalStyles'
import TaskBoard from './classComponents/TaskBoard'
import Login from './components/Login'
import Register from './components/Register'
import {AuthContext} from './context/AuthContext'

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.text};
  transition: all 0.3s ease;
`

const ThemeToggleButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${({theme}) => theme.colors.primary};
  color: white;
  z-index: 1000;

  &:hover {
    transform: scale(1.05);
  }
`

function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [page, setPage] = useState('login')
  const {user} = useContext(AuthContext)

  let content

  if (user) {
    content = <TaskBoard />
  } else if (page === 'login') {
    content = <Login switchToRegister={() => setPage('register')} />
  } else {
    content = <Register switchToLogin={() => setPage('login')} />
  }

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <AppContainer>
        <ThemeToggleButton
          type="button"
          onClick={() => setDarkMode(prev => !prev)}
        >
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </ThemeToggleButton>

        {content}
      </AppContainer>
    </ThemeProvider>
  )
}

export default App
