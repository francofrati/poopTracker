import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { getData, writeData } from "./database";


const provider = new GoogleAuthProvider();

export const popUpSignIn = () => {
    return signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);


            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;

            const registerUserInDb = async () => {
                const userExists = await getData('users/' + user.uid)
                if (!userExists) {
                    writeData('users/' + user.uid, {
                        email: user.email,
                        poops: 0,
                        exp: 0,
                        poop_log: JSON.stringify([])
                    })
                }
            }
            registerUserInDb()
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            console.log(error)
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

export const logOut = () => {
    return signOut(auth)
}