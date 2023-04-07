import { FC } from 'react'
import { Space_Grotesk } from '@next/font/google'

import { _User } from "@/types/firebase_users"
import { getLevel } from '@/utils/poopXP'


const font = Space_Grotesk({
    weight: '400',
    subsets: ['latin']
})

interface StatsTableProps {
    poopStats: _User[]
}

const StatsTable: FC<StatsTableProps> = ({ poopStats }) => {
    return (
        <div
            className='w-full  max-w-[600px] max-h-[350px] example overflow-y-scroll m-auto global_table_shadow rounded-[10px]'
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
                            {poopStats.sort((a, b) => b.poops - a.poops).map((u: any, i: number) => {
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
                                        {getLevel(u.exp)?.level}
                                    </td>
                                    <td
                                        className='grid place-content-center'
                                    >
                                        <p
                                            className='px-1 cursor-pointer'
                                            onClick={()=>alert(u.username ? u.username : u.email.split('@')[0])}
                                        >
                                            {u.username ? u.username : u.email.split('@')[0]}
                                        </p>
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
    )
}

export default StatsTable