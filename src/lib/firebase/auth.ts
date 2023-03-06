import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { getData, writeData } from "./database";


const provider = new GoogleAuthProvider();

export const popUpSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);


        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;

        const registerUserInDb = async () => {
            const userExists = await getData('users/' + user.uid);
            if (!userExists) {
                writeData('users/' + user.uid, {
                    email: user.email,
                    poops: 0,
                    exp: 0,
                    poop_log: JSON.stringify([])
                });
            }
        };
         registerUserInDb();
    } catch (error) {
        // Handle Errors here.
        console.log(error);
    }
}

export const logOut = () => {
    return signOut(auth)
}