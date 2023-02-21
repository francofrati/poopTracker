import Layout from '@/components/layout'
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
      {
        user
          ? <button
            onClick={logOut}
            className='p-2 bg-white text-blue-200 rounded shadow-sm'
          >
            Log Out
          </button>
          : <></>
      }
      <Component {...pageProps} />
    </Layout>
  )
}
