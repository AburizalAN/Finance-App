import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDAbHVcqlajFg-qr_B0qBZxKtC-7FUGTMg",
  authDomain: "finance-app-7a2bf.firebaseapp.com",
  projectId: "finance-app-7a2bf",
  storageBucket: "finance-app-7a2bf.appspot.com",
  messagingSenderId: "995582674456",
  appId: "1:995582674456:web:39c53fc662bbb514bba56d",
  measurementId: "G-LRLL3WCQ2H"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)