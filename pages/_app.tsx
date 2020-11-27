import '../styles/globals.css'
import theme from '../styles/theme'
import {useRouter} from 'next/router'
import { ThemeProvider } from '@emotion/react'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  const [rec, setRec] = useState<Object[]>(['Jane Doe','jdoe@email.com']);
  const [sender, setSender] = useState<Object[]>(['Jose Guierellmo','jg_dogers12@email.com']);

  return <ThemeProvider theme={theme}>
    <Component {...pageProps} router={router} rec={rec} sR={setRec} sender={sender} sS={setSender} />
  </ThemeProvider>
}

export default MyApp
