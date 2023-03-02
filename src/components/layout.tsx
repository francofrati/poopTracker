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
        </div>
    )
}

export default Layout