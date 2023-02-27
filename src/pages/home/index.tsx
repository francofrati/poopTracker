import { Space_Grotesk } from '@next/font/google'
import { IoMdAddCircle } from 'react-icons/io'
import React, { useState,useEffect } from 'react'
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

    useEffect(()=>{
        const getPoopData = async()=>{
            const data = await getData('users')
            if(data){
                // console.log(data)
                const formattedData = Object.entries(data).map((e:any)=>e[1])
                console.log(formattedData)
                setPoopStats([...formattedData])
            }
        }
        getPoopData()
    },[])



    return (
        <div>
            <section
                className={'flex justify-center'}
            >
                <div

                    className='w-[80%] max-w-[600px] global_table_shadow rounded-[10px]'
                >
                    <button
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
                    </button>

                    <table
                        className={`global_table ${font.className} `}
                    >
                        <thead>
                            <tr>
                                <th>
                                    Usuario
                                </th>
                                <th>
                                    Cagos Totales
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                poopStats.length
                                ?poopStats.map((u:any)=>{
                                    return<tr
                                    key={u.email}
                                    >
                                        <td>
                                            {u.email}
                                        </td>
                                        <td>
                                            {u.poops}💩
                                        </td>
                                    </tr>
                                    
                                })
                                :<></>
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default Home