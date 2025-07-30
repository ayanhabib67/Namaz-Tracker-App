
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth ,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import{serverTimestamp,collection,addDoc,getDocs ,where,getFirestore,onSnapshot,query, orderBy,deleteDoc ,doc }from"https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyAu3iriDq7f4gUdDFn1QiCpyJGdkdRmTwQ",
  authDomain: "namaz-tracker-b18a0.firebaseapp.com",
  projectId: "namaz-tracker-b18a0",
  storageBucket: "namaz-tracker-b18a0.firebasestorage.app",
  messagingSenderId: "1016763424523",
  appId: "1:1016763424523:web:934af8b9ef6ccf930e4c0e",
  measurementId: "G-TYTC9GHM3K"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export{
auth,
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
onAuthStateChanged,
serverTimestamp,
collection,
db,
addDoc,
query ,
orderBy,
onSnapshot,
where,
getDocs,
deleteDoc,
doc,
signOut 

}