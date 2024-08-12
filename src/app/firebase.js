import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

//TWO FIREBASE CONNECTIONS: PICK ACCORDINGLY

//AAYUSH'S FIREBASE CONNECTION BELOW
const firebaseConfig = {
    apiKey: "AIzaSyApoyI_LehncRMWf0iuaHi_gYCXq3ICLDo",
    authDomain: "chatbot-ee6c8.firebaseapp.com",
    projectId: "chatbot-ee6c8",
    storageBucket: "chatbot-ee6c8.appspot.com",
    messagingSenderId: "461953225670",
    appId: "1:461953225670:web:eb2f76b62199250b81d8c7",
    measurementId: "G-NWNB3RSDNK"
  };


//AMAN'S FIREBASE CONNECTION BELOW
// const firebaseConfig = {
//   apiKey: "AIzaSyB9BfFKl4kO4vIUDkxroxDkui_WbgM4zbo",
//   authDomain: "chat-bot-46302.firebaseapp.com",
//   projectId: "chat-bot-46302",
//   storageBucket: "chat-bot-46302.appspot.com",
//   messagingSenderId: "153552339305",
//   appId: "1:153552339305:web:c50b0bac511928a0393df8",
//   measurementId: "G-8X4305ZEYT"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)

export { auth, firestore }