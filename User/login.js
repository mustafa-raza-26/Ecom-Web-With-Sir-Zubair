import { firebaseConfig } from './firebase-Config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth);

let db = getFirestore(app)
let dbRef = collection(db, "users")

const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const loginBtn = document.getElementById('loginBtn')
const googleBtn = document.getElementById('googleBtn')

if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        await signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then(async (data)=>{
            console.log(data);
            if (data.user.emailVerified == true) {
                const q = query(dbRef, where('email', "==", userEmail.value))
                const querySnapshot = await getDocs(q);
                console.log(querySnapshot.docs[0].data());
                
                window.location.replace('./dashboard.html')
            }else{
                alert('plz verified Email')
            }
        })
        .catch((error)=>{
            console.log(error);
            alert('Account cant Login')
        })
    })
}

// google login
if (googleBtn) {
    googleBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const provider = new GoogleAuthProvider();
        await GoogleAuthProvider(auth, provider)
        .then((data)=>{
            console.log(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })
}

if (googleBtn) {
    googleBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const provider = new GoogleAuthProvider();
        await GoogleAuthProvider(auth, provider)
        .then((data)=>{
            console.log(data);
        })
        .catch((error)=>{
            console.log(error);
        })
    })
}