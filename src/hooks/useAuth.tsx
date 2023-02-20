import { onAuthStateChanged, User } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from '../config/firebase'


export const useAuth = () => {

    const [user, setUser] = useState<User>()
    const [userLoading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const listener = onAuthStateChanged(
            auth,
            async (user: User | null) => {
                if (user) {
                    setUser(user)
                    setLoading(false)
                }
                if (!user) {
                    setUser(undefined)
                    setLoading(false)
                }
                // console.log('Auth User: ', user)
            }
        );

        console.log(user)

        return () => {
            listener()
        }
    }, [auth])

    return { user, setUser, userLoading, setLoading }
}