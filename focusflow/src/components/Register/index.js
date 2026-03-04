import {useState} from 'react'
import styled from 'styled-components'
import API from '../../services/taskApi'

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({theme}) => theme.colors.background};
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

const Input = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.colors.secondary};
  background: ${({theme}) => theme.colors.background};
  color: ${({theme}) => theme.colors.text};
`

const Button = styled.button`
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: ${({theme}) => theme.colors.primaryGradient};
  color: white;
  font-weight: 600;
  cursor: pointer;
`

const Message = styled.p`
  text-align: center;
  margin-top: 12px;
`

const LinkText = styled.span`
  color: ${({theme}) => theme.colors.primary};
  cursor: pointer;
  font-weight: 600;
`

const Register = ({switchToLogin}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleChange = event => {
    const {name, value} = event.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await API.post('/auth/register', formData)
      setMessage(response.data.message)
      setError('')
      setTimeout(() => {
        switchToLogin()
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      setMessage('')
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Create Account 🚀</Title>

        <Input
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />

        <Button type="submit">Register</Button>

        {message && <Message style={{color: 'green'}}>{message}</Message>}
        {error && <Message style={{color: 'red'}}>{error}</Message>}

        <Message>
          Already registered? <LinkText onClick={switchToLogin}>Login</LinkText>
        </Message>
      </Form>
    </Container>
  )
}

export default Register
