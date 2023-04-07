import { FC, useRef } from 'react'
import { Space_Grotesk } from '@next/font/google'

import { FaUser } from 'react-icons/fa'

import { getData, writeData } from '@/lib/firebase/database'
import { User } from 'firebase/auth'


const font = Space_Grotesk({
    weight: '400',
    subsets: ['latin']
})

interface SetUsernameSectionProps {
    getUser: () => Promise<void>
    getPoopData: () => Promise<void>
    user: User | undefined
}

const SetUsernameSection: FC<SetUsernameSectionProps> = ({ getUser, getPoopData, user }) => {

    const usernameRef = useRef(null)

    return (
        <section
            className={`${font.className} bg-[#D9D9D9] w-[90%] max-w-[600px] rounded-[10px] p-2 flex flex-col gap-2 global_table_shadow`}
        >
            <p>Elegi un nombre de usuario</p>
            <p
                className='text-[10px] text-red-600 font-semibold'
            >
                SOLO SE PUEDE ELEGIR UNA VEZ ASI QUE ELEGI CON CUIDADO
            </p>
            <p
                className='text-[12px]'
            >
                12 letras max, 3 letras min, si se escribe un nombre de un familiar ajeno o se hace referencia a eso se le eligira un nombre de usuario al azar

            </p>
            <form
                className='relative'
                onSubmit={async (e) => {
                    e.preventDefault()
                    //@ts-expect-error
                    const { value } = usernameRef.current
                    if (value.length < 3 || value.length > 12) {
                        alert('No sabes leer?')
                        return
                    }
                    const users = await getData('users')
                    if (users) {
                        const formattedUsers = Object.entries(users).map((u: any) => {
                            // console.log(u,'sssss')
                            return u[1].username ? u[1].username : ''
                        })
                        // console.log(formattedUsers)

                        const isNameAvailable = !formattedUsers.includes(value.trim())
                        // console.log(isNameAvailable)

                        if (isNameAvailable) {
                            const setUsernameReq = await writeData('users/' + user?.uid + '/username', value.trim())
                            if (setUsernameReq.success) {
                                alert('Muy bien, elegiste tu nombre de usuario')
                                getUser()
                                getPoopData()
                            } else {
                                console.log(setUsernameReq.error)
                            }
                        } else {
                            alert('Ese nombre de usuario ya existe')
                        }

                    }
                    // console.log(value)
                }}
            >
                <input
                    type="text"
                    max={12}
                    min={3}
                    className='rounded w-full h-[30px] pl-8'
                    placeholder='Nombre de usuario'
                    ref={usernameRef}
                />
                <button
                    className='w-[80px] bg-[#704506] rounded absolute right-1 top-[3px]'
                >
                    Crear
                </button>
                <FaUser
                    color='#704506'
                    size={23}
                    style={{
                        position: 'absolute',
                        left: 1,
                        top: '3px'
                    }}
                />
            </form>
        </section>
    )
}

export default SetUsernameSection