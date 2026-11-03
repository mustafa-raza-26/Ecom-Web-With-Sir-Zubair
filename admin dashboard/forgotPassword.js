import { firebaseConfig } from './config/firebase_config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth);

const forgotEmail = document.getElementById('forgotEmail');
const resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await sendPasswordResetEmail(auth, forgotEmail.value)
    .then((data)=>{
        console.log(data);
        alert('Check Your Email')
    })
    .catch((error)=>{
        console.log(error.message);
    })
})