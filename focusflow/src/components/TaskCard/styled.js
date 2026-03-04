import styled from 'styled-components'

export const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
    padding: 15px;
  }
`

export const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  border: none;
  background: ${({theme}) => theme.colors.primary};
  color: white;
  border-radius: 6px;
`
