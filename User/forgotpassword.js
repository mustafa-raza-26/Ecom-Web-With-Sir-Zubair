import { firebaseConfig } from './firebase-Config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth);

const resetEmail = document.getElementById('resetEmail');
const resetBtn = document.getElementById('resetEmail');

resetBtn.addEventListener('click', async () => {
    await sendPasswordResetEmail(auth, resetEmail.value)
    .then((data)=>{
        console.log(data);
    })
    .catch((error)=>{
        console.log(error.message);
    })
})