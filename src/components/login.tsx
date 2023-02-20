import { Space_Grotesk } from '@next/font/google'

import { BsGoogle } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa'

const font = Space_Grotesk({
    weight:'400',    
    subsets:['latin']
})

const Login = () => {
    return (
        <div
            className={`w-full bg-[#3b3b3b] h-screen ${font.className}`}
        >
            <section 
            className='mx-auto bg-gray-200 rounded-[999px] w-[80px] h-[80px] grid place-content-center'
            >
            <img
                className="w-[100px]"
                src="http://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_grande.png?v=1571606036"
                />
                </section>
            <section
                className="flex flex-col gap-10 w-[85%] mx-auto text-white"
            >
                <button
                    className="bg-red-400 flex justify-start gap-2 rounded overflow-hidden h-[60px]"
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
                        className='grid place-content-center h-full text-[16px] font-bold text-center'
                    >
                        Iniciar Sesion con Google
                    </h6>
                </button>
                <button
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
                </button>
            </section>

        </div>
    )
}

export default Login