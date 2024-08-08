import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyApoyI_LehncRMWf0iuaHi_gYCXq3ICLDo",
    authDomain: "chatbot-ee6c8.firebaseapp.com",
    projectId: "chatbot-ee6c8",
    storageBucket: "chatbot-ee6c8.appspot.com",
    messagingSenderId: "461953225670",
    appId: "1:461953225670:web:eb2f76b62199250b81d8c7",
    measurementId: "G-NWNB3RSDNK"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firestore = getFirestore(app)

export { auth, firestore }