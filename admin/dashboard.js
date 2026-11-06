import { firebaseConfig } from './config/firebase_config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
// import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

let app = initializeApp(firebaseConfig)
let db = getFirestore(app)

let totalUser = document.getElementById('totalUser')

async function getAllStats() {
    const userRef = collection(db, 'users')
    const data = await getDocs(userRef)
    console.log(data.docs);
    let userCount = data.docs.length
    totalUser.innerText = ''
    totalUser.innerText = userCount

    for(let value of data.docs){
        console.log(value.data());
    }

}
getAllStats();