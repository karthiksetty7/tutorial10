import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 60px;
  padding: 30px;
  border-radius: ${({theme}) => theme.radius.lg};
  background: ${({theme}) => theme.colors.card};
  border: 1px solid ${({theme}) => theme.colors.border};
  box-shadow: ${({theme}) => theme.shadow.light};
  transition: 0.3s ease;
`

export const Title = styled.h2`
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 700;
  color: ${({theme}) => theme.colors.text};
`

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`

export const StatCard = styled.div`
  padding: 25px;
  border-radius: ${({theme}) => theme.radius.md};
  background: ${({theme}) => theme.colors.surface || theme.colors.card};
  border: 1px solid ${({theme}) => theme.colors.border};
  text-align: center;
  transition: 0.3s ease;

  /* 👇 FIXED DARK MODE TEXT */
  p {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    color: ${({theme}) => theme.colors.mutedText};
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({theme}) => theme.shadow.medium};
  }
`

export const StatValue = styled.h3`
  margin-top: 12px;
  font-size: 28px;
  font-weight: 800;
  color: ${({theme}) => theme.colors.primary};

  /* ✨ Optional glow in dark mode */
  text-shadow: ${({theme}) =>
    theme.mode === 'dark' ? '0 0 12px rgba(139,92,246,0.6)' : 'none'};
`
