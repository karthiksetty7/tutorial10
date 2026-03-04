import {Component} from 'react'
import styled from 'styled-components'
import TaskCard from '../../components/TaskCard'
import FocusMode from '../../components/FocusMode'
import ProcrastinationModal from '../../components/ProcrastinationModal'
import Analytics from '../../components/Analytics'
import StartScheduleModal from '../../components/StartScheduleModal'
import AddTaskModal from '../../components/AddTaskModal'
import API from '../../services/taskApi'
import {AuthContext} from '../../context/AuthContext'

/* ================= STYLES ================= */

const Container = styled.div`
  padding: 40px;
  min-height: 100vh;
  background: ${({theme}) => theme.colors.background};
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
  flex-wrap: wrap;
  gap: 20px;
`

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.h1`
  font-size: 34px;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const StreakBadge = styled.span`
  margin-top: 8px;
  font-size: 14px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 500;
  width: fit-content;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`

const PrimaryButton = styled.button`
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(99, 102, 241, 0.4);
  }
`

const SecondaryButton = styled.button`
  padding: 10px 18px;
  border-radius: 8px;
  border: 1px solid #ef4444;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  color: #ef4444;
  transition: all 0.3s ease;

  &:hover {
    background: #ef4444;
    color: white;
  }
`

const LoadingText = styled.p`
  margin-top: 20px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
`

/* ================= COMPONENT ================= */

class TaskBoard extends Component {
  state = {
    tasks: [],
    focusTask: null,
    showProcrastinationModal: false,
    distractionCount: 0,
    distractionHistory: [],
    focusStreak: 0,
    loading: false,
    showScheduleModal: false,
    showAddTaskModal: false,
  }

  componentDidMount() {
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
    this.fetchTasks()
  }

  componentWillUnmount() {
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange,
    )
  }

  handleVisibilityChange = () => {
    const {focusTask} = this.state

    if (document.hidden && focusTask) {
      const audio = new Audio('/alert.mp3')
      audio.play()

      this.setState(prev => {
        const newCount = prev.distractionCount + 1

        if (newCount >= 3) {
          return {
            focusTask: null,
            showProcrastinationModal: false,
            distractionCount: 0,
          }
        }

        return {
          showProcrastinationModal: true,
          distractionCount: newCount,
          distractionHistory: [
            ...prev.distractionHistory,
            {
              time: new Date(),
              taskId: prev.focusTask.id,
            },
          ],
        }
      })
    }
  }

  startSchedule = async criteria => {
    try {
      const res = await API.get(
        `/tasks/suggest?energy=${criteria.energy}&mood=${criteria.mood}&priority=${criteria.priority}`,
      )
      if (res.data) {
        this.setState({
          focusTask: res.data,
          showScheduleModal: false,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  fetchTasks = async () => {
    try {
      this.setState({loading: true})
      const res = await API.get('/tasks')
      this.setState({tasks: res.data, loading: false})
    } catch (error) {
      console.error(error)
      this.setState({loading: false})
    }
  }

  createTask = async newTask => {
    try {
      const res = await API.post('/tasks', newTask)
      this.setState(prev => ({
        tasks: [...prev.tasks, res.data],
      }))
    } catch (error) {
      console.error(error)
    }
  }

  deleteTask = async id => {
    try {
      await API.delete(`/tasks/${id}`)
      this.setState(prev => ({
        tasks: prev.tasks.filter(task => task.id !== id),
      }))
    } catch (error) {
      console.error(error)
    }
  }

  updateTask = async (id, updatedData) => {
    try {
      const res = await API.put(`/tasks/${id}`, updatedData)

      this.setState(prev => ({
        tasks: prev.tasks.map(task => (task.id === id ? res.data : task)),
      }))
    } catch (error) {
      console.error(error)
    }
  }

  startFocus = task => {
    this.setState({
      focusTask: task,
      distractionCount: 0,
    })
  }

  incrementStreak = async completedTask => {
    await this.updateTask(completedTask.id, {
      completed: 1,
      completion_time: completedTask.focus_time,
    })

    this.setState(prev => ({
      focusStreak: prev.focusStreak + 1,
      focusTask: null,
    }))

    const res = await API.get(
      `/tasks/suggest?energy=${completedTask.energy_level}`,
    )

    if (res.data) {
      this.setState({focusTask: res.data})
    }
  }

  render() {
    const {logout} = this.context
    const {tasks, focusTask, showProcrastinationModal} = this.state
    const {focusStreak, loading, showScheduleModal} = this.state
    const {showAddTaskModal} = this.state
    return (
      <Container>
        <Header>
          <PrimaryButton
            type="button"
            onClick={() => this.setState({showScheduleModal: true})}
          >
            Start Schedule
          </PrimaryButton>
          {showAddTaskModal && (
            <AddTaskModal
              onClose={() => this.setState({showAddTaskModal: false})}
              onCreate={async taskData => {
                await this.createTask(taskData)
                await this.fetchTasks()
                this.setState({showAddTaskModal: false})
              }}
            />
          )}
          <TitleSection>
            <Title>FocusFlow 🔥</Title>
            <StreakBadge>Focus Streak: {focusStreak}</StreakBadge>
          </TitleSection>

          <ButtonGroup>
            <PrimaryButton
              type="button"
              onClick={() => this.setState({showAddTaskModal: true})}
            >
              + Add Task
            </PrimaryButton>

            <SecondaryButton onClick={logout} type="button">
              Logout
            </SecondaryButton>
          </ButtonGroup>
        </Header>

        {showScheduleModal && (
          <StartScheduleModal
            onStart={this.startSchedule}
            onClose={() => this.setState({showScheduleModal: false})}
          />
        )}

        {loading && <LoadingText>Loading tasks...</LoadingText>}

        <Grid>
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={this.deleteTask}
              onUpdate={this.updateTask}
              onFocus={this.startFocus}
            />
          ))}
        </Grid>

        {focusTask && (
          <FocusMode
            task={focusTask}
            onClose={() => this.setState({focusTask: null})}
            onComplete={this.incrementStreak}
          />
        )}

        {showProcrastinationModal && (
          <ProcrastinationModal
            onClose={() => this.setState({showProcrastinationModal: false})}
          />
        )}

        <Analytics tasks={tasks} />
      </Container>
    )
  }
}

TaskBoard.contextType = AuthContext

export default TaskBoard
