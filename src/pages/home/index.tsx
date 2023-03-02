import { Space_Grotesk } from '@next/font/google'
import { IoMdAddCircle } from 'react-icons/io'
import React, { useState, useEffect } from 'react'
import { getData } from '@/lib/firebase/database'
import { useAuth } from '@/hooks/useAuth'
import { addPoop } from '@/lib/firebase/poops'

const font = Space_Grotesk({
    weight: '400',
    subsets: ['latin']
})

const Home = () => {

    const [poopStats, setPoopStats] = useState<any[]>([])

    const { user } = useAuth()

    useEffect(() => {
        const getPoopData = async () => {
            const data = await getData('users')
            if (data) {
                // console.log(data)
                const formattedData = Object.entries(data).map((e: any) => e[1])
                console.log(formattedData)
                setPoopStats([...formattedData])
            }
        }
        getPoopData()
    }, [])



    return (
        <div
            className='w-full flex flex-col items-center gap-6'
        >
            <section
                className='bg-[#D9D9D9] w-[90%] rounded-[10px] p-2 flex flex-col gap-2'
            >
                <section
                    className='w-full  h-full flex flex-col'
                >
                    <section
                        className='flex items-center gap-2'
                    >
                        <span
                            className='border-[2px] border-[#704506] rounded-[999px] p-1 text-[#D9D9D9] bg-[#434343] w-[35px] h-[35px] text-xl grid place-content-center'
                        >
                            23
                        </span>
                        <span
                            className='text-[16px] text-[#704506]'
                        >
                            {user ? user.email?.split('@')[0] : ''}
                            <strong className='font-snormal text-[10px] font-bold text-[#5C5C5C]'>      NOVATO</strong>
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
                                    className='text-[#704506]'
                                >
                                    100💩
                                </strong>

                            </p>
                        </span>
                        <span
                            className='flex gap-1 items-center'
                        >
                            <p
                                className='font-semibold text-[#5C5C5C]'
                            >
                                Semanal:
                                <strong
                                    className='text-[#704506]'
                                >
                                    100💩
                                </strong>

                            </p>
                        </span>
                        <span
                            className='flex gap-1 items-center'
                        >
                            <p
                                className='font-semibold text-[#5C5C5C]'
                            >
                                Mensual:
                                <strong
                                    className='text-[#704506]'
                                >
                                    100💩
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
                                    className='text-[#704506]'
                                >
                                    100💩
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

                                if (poopUser) {
                                    const addPoopReq = await addPoop(poopUser, user.uid)
                                    if (addPoopReq.success) {
                                        alert(addPoopReq.msg)
                                    } else {
                                        alert('ERROROROROR')
                                    }
                                }
                            }

                        }}
                        className='w-[100px] animate-grow'
                        src="https://static.vecteezy.com/system/resources/previews/001/202/843/non_2x/poo-emoji-png.png" 
                        />
                    </section>
                </section>
            </section>
            <section
                className={'w-[90%]'}
            >
                <div

                    className='w-full max-w-[600px] global_table_shadow rounded-[10px]'
                >
                    {/* <button
                        className='m-2'
                        onClick={async () => {
                            if (user) {

                                const poopUser = await getData(`users/${user.uid}`)

                                if (poopUser) {
                                    const addPoopReq = await addPoop(poopUser, user.uid)
                                    if (addPoopReq.success) {
                                        alert(addPoopReq.msg)
                                    } else {
                                        alert('ERROROROROR')
                                    }
                                }
                            }

                        }}
                    >
                        <IoMdAddCircle
                            color='green'
                            size={40}
                        />
                    </button> */}

                    <table
                        className={`global_table ${font.className} `}
                    >
                        <thead>
                            <tr>
                                <th>
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
                        <tbody>

                            {
                                poopStats.length
                                    ? poopStats.map((u: any) => {
                                        return <tr
                                            key={u.email}
                                        >
                                            <td
                                                className='text-[5C5C5C]'
                                            >
                                                23
                                            </td>
                                            <td
                                                className=''
                                            >
                                                {u.email.split('@')[0]}
                                            </td>
                                            <td>
                                                {u.poops} 💩
                                            </td>
                                        </tr>
                                    })
                                    : <></>
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Home