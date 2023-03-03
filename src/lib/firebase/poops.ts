import { getData, writeData } from './database'

export const addPoop = async (user: any, uid: string) => {

    const poopLog = user.poop_log
        ? JSON.parse(user.poop_log)
        : undefined

    // console.log(new Date(poopLog[0].timestamp).)



    const data = {
        ...user,
        poop_log: !poopLog
            ? JSON.stringify([{
                timestamp: new Date(),
            }])
            : JSON.stringify([
                ...poopLog,
                {
                    timestamp: new Date()
                }
            ])
        ,
        poops: user.poops ? user.poops + 1 : 1,
        exp: user.exp ? user.exp + 50 : 50
    }

    const add = await writeData('users/' + uid, data)

    if (add.success) {
        return {
            success: true,
            msg: 'Poop added successfully!'
        }
    } else {
        return {
            success: false,
            msg: "There's been an error while adding the poop!",
            error: add.error ? add.error : 'Check Error!!'
        }
    }
}