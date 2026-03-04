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
  width: 420px;
`

const Input = styled.input`
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
`

const Select = styled.select`
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 8px;
`

const AddTaskModal = ({onClose, onCreate}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    energy_level: 'MEDIUM',
    mood: 'LOGICAL',
    priority: 'MEDIUM',
    focus_time: 25,
  })

  const handleChange = event => {
    const {name, value} = event.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleSubmit = () => {
    if (!formData.title.trim()) return
    onCreate(formData)
  }

  return (
    <Overlay>
      <Modal>
        <h3>Create Task</h3>

        <Input name="title" placeholder="Task Title" onChange={handleChange} />

        <Input
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <Select name="energy_level" onChange={handleChange}>
          <option value="LOW">LOW Energy</option>
          <option value="MEDIUM">MEDIUM Energy</option>
          <option value="HIGH">HIGH Energy</option>
        </Select>

        <Select name="mood" onChange={handleChange}>
          <option value="CREATIVE">CREATIVE</option>
          <option value="LOGICAL">LOGICAL</option>
          <option value="ADMIN">ADMIN</option>
        </Select>

        <Select name="priority" onChange={handleChange}>
          <option value="LOW">LOW Priority</option>
          <option value="MEDIUM">MEDIUM Priority</option>
          <option value="HIGH">HIGH Priority</option>
        </Select>

        <Input
          name="focus_time"
          type="number"
          placeholder="Focus Time (minutes)"
          defaultValue={25}
          onChange={handleChange}
        />

        <Button onClick={handleSubmit}>Create</Button>
        <Button onClick={onClose}>Cancel</Button>
      </Modal>
    </Overlay>
  )
}

export default AddTaskModal
