import React, { FC, ReactNode } from 'react'
import Navbar from './navbar'


interface LayoutProps {
    children: ReactNode
    user: any
}

const Layout: FC<LayoutProps> = ({ children, user }) => {

    // const deviceHeight = document !== undefined ? document.documentElement.clientHeight : 'ss'
    // console.log(document)
    return (
        <div
            className={`h-screen`}
        >
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
            <footer
                className='absolute bottom-1 left-2'
            >
                <p
                    className='text-white text-[10px] text-center'
                >
                    Version: Beta 0.0.1
                </p>
            </footer>
        </div>
    )
}

export default Layout