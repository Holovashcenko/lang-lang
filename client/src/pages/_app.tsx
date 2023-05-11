import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { authApi } from '../api/auth-api'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApiProvider api={authApi}>
      <Component {...pageProps} />
    </ApiProvider>
  )
}
