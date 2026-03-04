import styled, {keyframes} from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const slideUp = keyframes`
  from {
    transform: translateY(40px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out;
`

export const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  text-align: center;
  animation: ${slideUp} 0.3s ease-out;

  @media (max-width: ${({theme}) => theme.breakpoints.mobile}) {
    width: 90%;
    padding: 20px;
  }
`

export const Title = styled.h2`
  margin-bottom: 15px;
  color: ${({theme}) => theme.colors.danger};
`

export const Message = styled.p`
  margin-bottom: 20px;
`

export const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background: ${({theme}) => theme.colors.primary};
  color: white;
  border-radius: 6px;
  cursor: pointer;
`
