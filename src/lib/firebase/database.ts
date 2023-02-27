import { db } from "@/config/firebase";
import { ref, child, get, set } from "firebase/database";

const dbRef = () => ref(db)

export const getData = async (path: string) => {

    try {
        const snapshot = await get(child(dbRef(), path))

        if (snapshot.exists()) {
            console.log(snapshot.val());
            // value = snapshot.val()
            return snapshot.val()
        } else {
            console.log("No data available");
        }

    } catch (error) {
        console.log(error)
        return undefined
    }


}

export const writeData = async (path: string, data: any) => {
    try {
        await set(ref(db, path), data);
        return {
            success: true
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }

}