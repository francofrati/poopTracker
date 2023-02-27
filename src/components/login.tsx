import { useAuth } from '@/hooks/useAuth'
import { popUpSignIn } from '@/lib/firebase/auth'
import { getData } from '@/lib/firebase/database'
import { Space_Grotesk } from '@next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF, FaUserAlt } from 'react-icons/fa'

const font = Space_Grotesk({
    weight: '400',
    subsets: ['latin']
})

const Login = () => {

    const [totalUsers, setTotalUsers] = useState<number>(0)

    const { user } = useAuth()

    const router = useRouter()

    useEffect(() => {
        const getTotalUsers = async () => {
            const users: any = await getData('/users')
            console.log(users)
            if (users) {
                setTotalUsers(Object.entries(users).length)
            }
            // return users
        }
        getTotalUsers()

    }, [])

    useEffect(() => {
        if (user) router.push('/home')
    }, [user])

    return (
        <div
            className={`w-full md:w-3/4 md:max-w-[600px] md:mx-auto flex flex-col py-[60px] gap-4 ${font.className}`}
        >
            <section
                className=' mx-auto bg-gray-200 rounded-[999px] w-[150px] h-[150px] grid place-content-center'
            >
                <img
                    className="w-[100px]"
                    src="http://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_grande.png?v=1571606036"
                />
            </section>
            <h2
                className='text-white text-xl text-center'
            >
                Bienvenidos a <strong className='text-2xl'>PoopTracker</strong>
            </h2>
            <p
                className='text-white text-center mx-auto w-[70%]'
            >
                Una plataforma para hacer seguimiento de sus problemas intestinales
            </p>
            <section
                className="flex flex-col gap-10 w-[85%] mx-auto text-white"
            >
                <button
                    onClick={popUpSignIn}
                    className="bg-red-400 flex justify-start rounded overflow-hidden h-[60px]"
                >
                    <span
                        className='bg-red-500 p-3 grid place-content-center h-full'
                    >
                        <BsGoogle
                            color='white'
                            size={30}
                        />
                    </span>
                    <h6
                        className='grid place-content-center h-full text-[16px]  mx-auto font-bold text-center'
                    >
                        Iniciar Sesion con Google
                    </h6>
                </button>
                {/* <button
                    className="bg-blue-500 flex justify-start gap-2 rounded overflow-hidden h-[60px]"
                >
                    <span
                        className='bg-blue-600 p-3 grid place-content-center h-full'
                    >
                        <FaFacebookF
                            color='white'
                            size={30}
                        />
                    </span>
                    <h6
                        className='grid place-content-center h-full text-[16px] font-bold text-center'
                    >
                        Iniciar Sesion con Facebook
                    </h6>
                </button> */}
            </section>
            <section
                className='flex justify-center text-white items-center gap-2'
            >
                {totalUsers}
                <section
                    className='relative flex flex-col items-center'
                >
                    <FaUserAlt
                        color='white'
                    />
                    <img
                        src="http://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_grande.png?v=1571606036"
                        className='poop_login'
                    />
                </section>
            </section>
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

export default Login