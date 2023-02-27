import { getData, writeData } from './database'

export const addPoop = async ( user:any,uid: string) => {

    const data = {
        ...user,
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