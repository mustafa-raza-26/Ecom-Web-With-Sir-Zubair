import { firebaseConfig } from './config/firebase_config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth);

let db = getFirestore(app)
let dbRef = collection(db, "admin")

const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const loginBtn = document.getElementById('loginBtn')

if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        await signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then(async (data) => {
            if (data.user.emailVerified == true) {
                window.location.replace('./dashboard.html')
            }else{
                alert('Verify Your Email\nCheck Your Email Inbox')
            }
        })
    })
}

// Show / hide password
document.querySelectorAll('[data-toggle-pass]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const input = document.getElementById(btn.dataset.togglePass);
        const icon = btn.querySelector('i');
        const show = input.type === 'password';
 
        input.type = show ? 'text' : 'password';
        icon.classList.toggle('fa-eye', !show);
        icon.classList.toggle('fa-eye-slash', show);
        btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
});