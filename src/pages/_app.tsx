import Layout from '@/components/layout'
import Navbar from '@/components/navbar'
import { useAuth } from '@/hooks/useAuth'
import { logOut } from '@/lib/firebase/auth'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {

  const { user, userLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/')
    }
  }, [user, userLoading])

  return (
    <Layout
      user={user}
    >
      <Component {...pageProps} />
    </Layout>
  )
}
