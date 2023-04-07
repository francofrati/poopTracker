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
import StatsTable from './statsTable'
import SetUsernameSection from './setUsernameSection'

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
            // console.log(getLevel(poopUser.exp))
        } else if (!poopUser && user) {
            getUser()
        }
    }

    const getPoopData = async () => {
        const data = await getData('users')
        if (data) {
            // console.log(data)
            const formattedData = Object.entries(data).map((e: any) => e[1])
            // console.log(formattedData)
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
                                        className='border-[2px] pb-[2px] border-[#704506] rounded-[999px] text-[#D9D9D9] bg-[#434343] w-[35px] h-[35px] text-xl grid place-content-center'
                                        onClick={() => {
                                            alert('Este es tu nivel de experiencia, segui cagando para subir de nivel')
                                        }}
                                    >
                                        {getLevel(currentUser.exp)?.level}
                                    </span>
                                    <span
                                        className='text-[16px] text-[#704506] font-semibold'
                                    >
                                        {
                                            currentUser.username ? currentUser.username : currentUser.email?.split('@')[0]
                                        }
                                        <strong className='font-snormal text-[10px] font-bold text-[#5C5C5C]'>{' ' + getLevel(currentUser.exp)?.name}</strong>
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
                                                        : ' 0'
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
                                                // console.log(poopUser)
                                                if (poopUser) {
                                                    const log = JSON.parse(poopUser.poop_log).map((p: { timestamp: string }) => new Date(p.timestamp)).sort((a: any, b: any) => a - b)
                                                    if (log.length) {

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
                                                    } else {
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
                    ? <SetUsernameSection
                        user={user}
                        getUser={getUser}
                        getPoopData={getPoopData}
                    />
                    : <></>
            }
            <section
                className={'w-[90%] flex'}
            >
                <StatsTable
                    poopStats={poopStats}
                />
            </section>
        </div>
    )
}

export default Home