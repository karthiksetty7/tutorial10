import {Container, Title, StatsGrid, StatCard, StatValue} from './styled'

const Analytics = ({tasks}) => {
  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.completed).length
  const totalFocusTime = tasks.reduce(
    (sum, t) => sum + (t.completion_time || 0),
    0,
  )

  const mostPostponed =
    tasks.length > 0
      ? [...tasks].sort((a, b) => b.delay_count - a.delay_count)[0]
      : null

  return (
    <Container>
      <Title>📊 Smart Analytics</Title>

      <StatsGrid>
        <StatCard>
          <p>Total Tasks</p>
          <StatValue>{totalTasks}</StatValue>
        </StatCard>

        <StatCard>
          <p>Completed</p>
          <StatValue>{completedTasks}</StatValue>
        </StatCard>

        <StatCard>
          <p>Total Focus Time</p>
          <StatValue>{totalFocusTime} mins</StatValue>
        </StatCard>

        <StatCard>
          <p>Most Postponed</p>
          <StatValue>{mostPostponed ? mostPostponed.title : 'None'}</StatValue>
        </StatCard>
      </StatsGrid>
    </Container>
  )
}

export default Analytics
