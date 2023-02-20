import React, { FC, ReactNode } from 'react'
import Navbar from './navbar'


interface LayoutProps {
    children: ReactNode
    user: any
}

const Layout: FC<LayoutProps> = ({ children, user }) => {

    

    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout