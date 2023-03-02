import { logOut } from "@/lib/firebase/auth"
import { useRouter } from "next/router"

import { BiLogOutCircle } from 'react-icons/bi'


const Navbar = () => {

    const router = useRouter()
    if (router.pathname==='/') {
        return <></>
    } else {
        return (
            <nav
                className="w-full h-12 flex items-center justify-between text-white px-2"
            >
                <p
                    className="text-2xl select-none"
                >
                    💩PoopTracker
                </p>
                <button
                    className="flex items-center gap-2 rounded-[999px] bg-red-500 px-4 py-1"
                    onClick={logOut}
                >
                    <BiLogOutCircle /> Cerrar
                </button>

            </nav>
        )
    }
}

export default Navbar