import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDzhufIO8Thg8bf7VXDOa8ersKJ3KFfaGw",
  authDomain: "akki-japan-mission.firebaseapp.com",
  projectId: "akki-japan-mission",
  storageBucket: "akki-japan-mission.firebasestorage.app",
  messagingSenderId: "845401658950",
  appId: "1:845401658950:web:70666bad708af1d8b1dc47",
  measurementId: "G-3B82P956VG"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
