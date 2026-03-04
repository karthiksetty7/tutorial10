import {useState} from 'react'
import styled from 'styled-components'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  background: ${({theme}) => theme.colors.card};
  padding: 30px;
  border-radius: 12px;
  width: 400px;
`

const Button = styled.button`
  margin-top: 15px;
  padding: 10px;
  width: 100%;
`

const Select = styled.select`
  width: 100%;
  margin-bottom: 12px;
  padding: 8px;
`

const StartScheduleModal = ({onStart, onClose}) => {
  const [energy, setEnergy] = useState('MEDIUM')
  const [mood, setMood] = useState('LOGICAL')
  const [priority, setPriority] = useState('MEDIUM')

  const handleSubmit = () => {
    onStart({energy, mood, priority})
  }

  return (
    <Overlay>
      <Modal>
        <h3>Start Schedule</h3>
        <Select onChange={e => setEnergy(e.target.value)}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </Select>

        <Select onChange={e => setMood(e.target.value)}>
          <option value="CREATIVE">CREATIVE</option>
          <option value="LOGICAL">LOGICAL</option>
          <option value="ADMIN">ADMIN</option>
        </Select>

        <Select onChange={e => setPriority(e.target.value)}>
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </Select>

        <Button onClick={handleSubmit}>Find Task</Button>
        <Button onClick={onClose}>Cancel</Button>
      </Modal>
    </Overlay>
  )
}

export default StartScheduleModal
