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

  if (userLoading) {
    return <div
      className='w-full h-screen overflow-hidden grid place-content-center'
    >
      <section
        className='flex flex-col items-center gap-4'
      >
        <p
          className="text-3xl text-white select-none"
        >
          <strong className='text-5xl'>💩</strong> PoopTracker
        </p>
        <span className='loader_white_lg'></span>
      </section>
    </div>
  }
  return (
    <Layout
      user={user}
    >
      <Component {...pageProps} />
    </Layout>
  )
}
