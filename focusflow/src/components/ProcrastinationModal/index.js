import styled from 'styled-components'

/* ================= STYLES ================= */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`

const Modal = styled.div`
  background: ${({theme}) => theme.colors.card || '#fff'};
  border-radius: ${({theme}) => theme.radius?.md || '12px'};
  padding: 40px;
  width: 100%;
  max-width: 420px;
  text-align: center;
  border: 1px solid ${({theme}) => theme.colors.border || '#ccc'};
  box-shadow: ${({theme}) =>
    theme.shadow?.medium || '0 4px 20px rgba(0,0,0,0.1)'};
  backdrop-filter: blur(12px);
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const Title = styled.h2`
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text || '#000'};
`

const Message = styled.p`
  margin: 0;
  font-size: 16px;
  color: ${({theme}) => theme.colors.text || '#333'};
`

const Button = styled.button`
  padding: 10px 18px;
  border-radius: ${({theme}) => theme.radius?.sm || '6px'};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.25s ease;
  background: ${({theme}) => theme.colors.danger || '#dc3545'};
  color: white;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${({theme}) =>
      theme.shadow?.light || '0 2px 8px rgba(0,0,0,0.15)'};
  }
`

/* ================= COMPONENT ================= */
const ProcrastinationModal = ({warningMessage, onClose}) => (
  <Overlay>
    <Modal>
      <Title>{warningMessage || '⚠ Stay Focused!'}</Title>
      <Message>
        {warningMessage || 'You switched tabs during focus mode.'}
      </Message>
      {onClose && <Button onClick={onClose}>Continue</Button>}
    </Modal>
  </Overlay>
)

export default ProcrastinationModal
