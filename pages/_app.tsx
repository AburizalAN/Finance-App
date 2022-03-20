import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import { theme } from 'components/style'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
