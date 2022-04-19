import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: proccess.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: proccess.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: proccess.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: proccess.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: proccess.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: proccess.env.REACT_APP_FIREBASE_APP_ID
})

export const auth = appl.auth()
export default app;