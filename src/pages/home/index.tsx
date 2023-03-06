import { Space_Grotesk } from '@next/font/google'
import React, { useState, useEffect, useRef } from 'react'
import { getData, writeData } from '@/lib/firebase/database'
import { useAuth } from '@/hooks/useAuth'
import { addPoop } from '@/lib/firebase/poops'
import { getCurrentMonth, getDayOfMonth, getTwoHoursDifference } from '@/utils/dates'
import { onValue, ref } from 'firebase/database'
import { db } from '@/config/firebase'
import { Modal } from 'antd'
import UsernameModal from '@/components/usernameModal'
import { FaUser } from 'react-icons/fa'
import { getLevel } from '@/utils/poopXP'

const font = Space_Grotesk({
    weight: '400',
    subsets: ['latin']
})


const Home = () => {

    const [poopStats, setPoopStats] = useState<any[]>([])
    const [currentUser, setCurrentUser] = useState<any>()
    const [isOpen, toggle] = useState<boolean>(true)
    const [poops, setPoops] = useState<number | string | any>(0)

    const usernameRef = useRef(null)


    const { user, userLoading } = useAuth()

    // onValue(ref(db,'users/'+user?.uid+'/poops'),(snapshot)=>{
    //     console.log(snapshot.val(),'soy un observer')
    // })

    const getMonthPoops = () => {
        let total = 0
        if (currentUser && currentUser.poop_log) {
            const poopLog = JSON.parse(currentUser.poop_log)


            poopLog.forEach((p: any) => {
                const currentMonth = getCurrentMonth(new Date(p.timestamp))

                if (currentMonth) total = total + 1

            })

        }
        return total
    }

    const getDayPoops = () => {
        let total = 0
        if (currentUser && currentUser.poop_log) {
            const poopLog = JSON.parse(currentUser.poop_log)
            poopLog.forEach((p: any) => {
                const currentDay = getDayOfMonth(new Date(p.timestamp))

                if (currentDay) total = total + 1

            })
        }
        return total
    }

    const getUser = async () => {
        const poopUser = await getData(`users/${user?.uid}`)

        if (poopUser) {
            setCurrentUser(poopUser)
            console.log(getLevel(poopUser.exp))
        } else if (!poopUser && user) {
            getUser()
        }
    }

    const getPoopData = async () => {
        const data = await getData('users')
        if (data) {
            // console.log(data)
            const formattedData = Object.entries(data).map((e: any) => e[1])
            console.log(formattedData)
            setPoopStats([...formattedData])
        }
    }
    useEffect(() => {

        Promise.all([
            getPoopData(),
            getUser()
        ])
    }, [user])

    return (
        <div
            className='w-full flex flex-col pt-4 items-center gap-6'
        >
            {/* <UsernameModal
                isOpen={isOpen}
                toggle={toggle}
            /> */}

            <section
                className='bg-[#D9D9D9] w-[90%] max-w-[600px] rounded-[10px] p-2 flex flex-col h-[150px] gap-2 global_table_shadow'
            >

                {
                    !currentUser
                        ? <div className='w-full h-full grid place-content-center'><span className='loader_sm'></span></div>
                        : <>
                            <section
                                className='w-full  h-full flex flex-col'
                            >
                                <section
                                    className='flex items-center gap-2'
                                >
                                    <span
                                        className='border-[2px] border-[#704506] rounded-[999px] p-1 text-[#D9D9D9] bg-[#434343] w-[35px] h-[35px] text-xl grid place-content-center'
                                    >
                                        {getLevel(currentUser.exp)?.level}
                                    </span>
                                    <span
                                        className='text-[16px] text-[#704506] font-semibold'
                                    >
                                        {
                                            currentUser.username ? currentUser.username : currentUser.email?.split('@')[0]
                                        }
                                        <strong className='font-snormal text-[10px] font-bold text-[#5C5C5C]'>{getLevel(currentUser.exp)?.name}</strong>
                                    </span>
                                </section>
                            </section>

                            <section
                                className='flex'
                            >
                                <section
                                    className='w-full flex flex-col gap-[2px] my-1 ml-2'
                                >
                                    <span
                                        className='flex gap-1 items-center'
                                    >
                                        <p
                                            className='font-semibold text-[#5C5C5C]'
                                        >
                                            Diario:
                                            <strong
                                                className='text-[#704506] font-normal'
                                            >
                                                {
                                                    currentUser && currentUser.poop_log
                                                        ? ' ' + getDayPoops()
                                                        : '-'
                                                }
                                                💩
                                            </strong>

                                        </p>
                                    </span>

                                    {/* <span
                            className='flex gap-1 items-center'
                        >
                            <p
                                className='font-semibold text-[#5C5C5C]'
                            >
                                Semanal:
                                <strong
                                    className='text-[#704506] font-normal'
                                >
                                    100💩
                                </strong>

                            </p>
                        </span> */}
                                    <span
                                        className='flex gap-1 items-center'
                                    >
                                        <p
                                            className='font-semibold text-[#5C5C5C]'
                                        >
                                            Mensual:
                                            <strong
                                                className='text-[#704506] font-normal'
                                            >
                                                {
                                                    currentUser && currentUser.poop_log
                                                        ? ' ' + getMonthPoops()
                                                        : '-'
                                                }💩
                                            </strong>

                                        </p>

                                    </span>
                                    <span
                                        className='flex gap-1 items-center'
                                    >
                                        <p
                                            className='font-semibold text-[#5C5C5C]'
                                        >
                                            All Time:
                                            <strong
                                                className='text-[#704506] font-normal'
                                            >
                                                {
                                                    currentUser && currentUser.poops
                                                        ? ' ' + currentUser.poops
                                                        : '-'
                                                }
                                                💩
                                            </strong>

                                        </p>
                                    </span>
                                </section>

                                <section
                                    className='w-full grid place-content-center'
                                >
                                    <img
                                        onClick={async () => {
                                            if (user) {

                                                const poopUser = await getData(`users/${user.uid}`)
                                                console.log(poopUser)
                                                if (poopUser) {
                                                    const log = JSON.parse(poopUser.poop_log).map((p: { timestamp: string }) => new Date(p.timestamp)).sort((a: any, b: any) => a - b)
                                                    if(log.length){

                                                        const lastPoopDate = log[log.length - 1]
                                                        
                                                        const twoHourDifference = getTwoHoursDifference(lastPoopDate)
                                                        // console.log(twoHourDifference)
                                                        if (twoHourDifference) {
                                                            
                                                            const addPoopReq = await addPoop(poopUser, user.uid)
                                                            if (addPoopReq.success) {
                                                                alert(addPoopReq.msg)
                                                                getPoopData()
                                                                getUser()
                                                            } else {
                                                                alert('Hubo un error, trata de nuevo')
                                                            }
                                                        } else {
                                                            alert('LIMITE DE CAGO CADA 2hs=1,SEGUI ESPERANDO BOLUDITO')
                                                        }
                                                    }else{
                                                        const addPoopReq = await addPoop(poopUser, user.uid)
                                                            if (addPoopReq.success) {
                                                                alert(addPoopReq.msg)
                                                                getPoopData()
                                                                getUser()
                                                            } else {
                                                                alert('Hubo un error, trata de nuevo')
                                                            }
                                                    }
                                                }
                                            }
                                        }}
                                        className='w-[100px] animate-grow cursor-pointer'
                                        src="https://static.vecteezy.com/system/resources/previews/001/202/843/non_2x/poo-emoji-png.png"
                                    />
                                </section>
                            </section>
                        </>
                }
            </section>
            {
                currentUser && !currentUser.username
                    ? <section
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
                                    console.log(formattedUsers)

                                    const isNameAvailable = !formattedUsers.includes(value.trim())
                                    console.log(isNameAvailable)

                                    if (isNameAvailable) {
                                        const setUsernameReq = await writeData('users/' + user?.uid + '/username', value.trim())
                                        if (setUsernameReq.success) {
                                            alert('Muy bien, elegiste tu nombre de usuario')
                                            getUser()
                                            getPoopData()
                                        } else {
                                            console.log(setUsernameReq.error)
                                        }
                                    }else{
                                        alert('Ese nombre de usuario ya existe')
                                    }

                                }
                                console.log(value)
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
                    : <></>
            }
            <section
                className={'w-[90%] flex'}
            >
                <div
                    className='w-full max-w-[600px] max-h-[350px] example overflow-y-scroll m-auto global_table_shadow rounded-[10px]'
                >
                    <table
                        className={`global_table ${font.className} `}
                    >
                        <thead>
                            <tr>
                                <th
                                    className='max-w-[20px] text-left'
                                >
                                    #
                                </th>
                                <th
                                    className='text-center'
                                >
                                    Lvl
                                </th>
                                <th>
                                    Usuario
                                </th>
                                <th>
                                    Cant
                                </th>
                            </tr>
                        </thead>
                        {

                            poopStats.length
                                ? <tbody
                                >
                                    {poopStats.map((u: any, i: number) => {
                                        return <tr
                                            key={u.email}
                                        >
                                            <td
                                                className='text-[5C5C5C] text-center'
                                            >
                                                #{i + 1}
                                            </td>
                                            <td
                                                className='text-[5C5C5C]'
                                            >
                                                23
                                            </td>
                                            <td
                                                className=''
                                            >
                                                {u.username ? u.username : u.email.split('@')[0]}
                                            </td>
                                            <td>
                                                {u.poops} 💩
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                                : <tbody
                                    className='h-[100px] bg-[#D9D9D9]'
                                >
                                    <tr
                                        className='h-[20px]'
                                    >
                                    </tr>
                                    <tr className='h-[315px] w-[90%] max-w-[600px] bg-[#D9D9D9] absolute top-[282px] rounded-b-[10px] grid place-content-center'>
                                        <td>
                                            <span className='loader_sm'></span>
                                        </td>
                                    </tr>
                                </tbody>
                        }
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Home