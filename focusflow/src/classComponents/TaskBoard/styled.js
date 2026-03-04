import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;

  @media (max-width: ${({theme}) => theme.breakpoints.tablet}) {
    padding: 10px;
  }
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: ${({theme}) => theme.breakpoints.laptop}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({theme}) => theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`
