import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
    background: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.colors.text};
    transition: all 0.3s ease;
  }
`

export default GlobalStyles
