import {useState, useEffect} from 'react'
import styled from 'styled-components'

/* ================= STYLES ================= */

const Card = styled.div`
  background: ${({theme}) => theme.colors.card};
  border-radius: ${({theme}) => theme.radius.md};
  padding: 24px;
  backdrop-filter: blur(12px);
  border: 1px solid ${({theme}) => theme.colors.border};
  box-shadow: ${({theme}) => theme.shadow.light};
  transition: 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 18px;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({theme}) => theme.shadow.medium};
  }
`

const TaskTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.text};
`

const Input = styled.input`
  padding: 10px;
  border-radius: ${({theme}) => theme.radius.sm};
  border: 1px solid ${({theme}) => theme.colors.border};
  background: transparent;
  color: ${({theme}) => theme.colors.text};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({theme}) => theme.colors.primary};
    box-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const Button = styled.button`
  padding: 8px 14px;
  border-radius: ${({theme}) => theme.radius.sm};
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: 0.25s ease;
`

const EditButton = styled(Button)`
  background: ${({theme}) => theme.colors.primaryGradient};
  color: white;

  &:hover {
    transform: scale(1.05);
  }
`

const FocusButton = styled(Button)`
  background: ${({theme}) => theme.colors.warning};
  color: white;

  &:hover {
    transform: scale(1.05);
  }
`

const SaveButton = styled(Button)`
  background: ${({theme}) => theme.colors.success};
  color: white;

  &:hover {
    transform: scale(1.05);
  }
`

const DeleteButton = styled(Button)`
  background: transparent;
  border: 1px solid ${({theme}) => theme.colors.danger};
  color: ${({theme}) => theme.colors.danger};

  &:hover {
    background: ${({theme}) => theme.colors.danger};
    color: white;
  }
`

/* ================= COMPONENT ================= */

const TaskCard = ({task, onDelete, onUpdate, onFocus}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(task.title)

  useEffect(() => {
    setTitle(task.title)
  }, [task.title])

  const handleSave = () => {
    onUpdate(task.id, {title})
    setIsEditing(false)
  }

  return (
    <Card>
      {isEditing ? (
        <>
          <Input value={title} onChange={e => setTitle(e.target.value)} />

          <ButtonGroup>
            <SaveButton onClick={handleSave}>Save</SaveButton>
            <DeleteButton onClick={() => onDelete(task.id)}>
              Delete
            </DeleteButton>
          </ButtonGroup>
        </>
      ) : (
        <>
          <TaskTitle>{task.title}</TaskTitle>

          <ButtonGroup>
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>

            <FocusButton onClick={() => onFocus(task)}>Focus</FocusButton>

            <DeleteButton onClick={() => onDelete(task.id)}>
              Delete
            </DeleteButton>

            <Button
              onClick={() =>
                onUpdate(task.id, {
                  delay_count: (task.delay_count || 0) + 1,
                  postpone_count: (task.postpone_count || 0) + 1,
                })
              }
            >
              Postpone
            </Button>
          </ButtonGroup>
        </>
      )}
    </Card>
  )
}

export default TaskCard
