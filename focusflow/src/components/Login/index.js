import {useState, useContext} from 'react'
import styled from 'styled-components'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import API from '../../services/taskApi'
import {AuthContext} from '../../context/AuthContext'

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.background};
  transition: all 0.4s ease;
`

const Form = styled.form`
  background: ${({theme}) => theme.colors.card};
  padding: 45px 40px;
  border-radius: 18px;
  width: 380px;
  box-shadow: 0 0 40px rgba(99, 102, 241, 0.2);
  display: flex;
  flex-direction: column;
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: ${({theme}) => theme.colors.text};
`

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 14px;
  padding-right: 45px;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.colors.secondary};
  font-size: 14px;

  background: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.text};

  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${({theme}) => theme.colors.primary};
    box-shadow: 0 0 10px ${({theme}) => theme.colors.primary}55;
  }
`

const EyeToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.colors.text};
`

const Button = styled.button`
  padding: 14px;
  border-radius: 10px;
  border: none;

  background: linear-gradient(
    135deg,
    ${({theme}) => theme.colors.primary},
    #8b5cf6
  );

  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(99, 102, 241, 0.4);
  }
`

const ErrorText = styled.p`
  color: ${({theme}) => theme.colors.danger};
  margin-top: 12px;
  text-align: center;
`
const LinkText = styled.p`
  text-align: center;
  cursor: pointer;
  color: blue;
`

const Login = ({switchToRegister}) => {
  const {login} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const res = await API.post('/auth/login', {
        email,
        password,
      })
      login(res.data.token, res.data.user)
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Welcome Back 👋</Title>

        <InputWrapper>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </InputWrapper>

        <InputWrapper>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <EyeToggle
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </EyeToggle>
        </InputWrapper>

        <Button type="submit">Login</Button>

        {error && <ErrorText>{error}</ErrorText>}
        <LinkText onClick={switchToRegister}>Not registered? Register</LinkText>
      </Form>
    </Container>
  )
}

export default Login
