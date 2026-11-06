import { firebaseConfig } from './config/firebase_config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
const firebase = 'https://userapp-6a08f-default-rtdb.asia-southeast1.firebasedatabase.app/'
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth);

const db = getFirestore(app)

let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userPassword = document.getElementById('userPassword');
let userConfirmPassword = document.getElementById('userConfirmPassword');
let userContactNumber = document.getElementById('userContactNumber');
let createAccount = document.getElementById('createAccount');

if (userPassword.value == userConfirmPassword.value) {
    if (createAccount) {
        createAccount.addEventListener('click', async (e) => {
            e.preventDefault();
            await createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
            .then(async (data)=>{
                console.log(data);
                alert('Account Create\nEmail Send For Verification')
                // Email Verification
                await sendEmailVerification(data.user)
                
                // Store Admin Data
                await setDoc(doc(db, 'admin', data.user.uid), {
                    userName: userName.value,
                    email: userEmail.value,
                    password: userPassword.value,
                    conatct_Number: userContactNumber.value
                })
                window.location.replace('./index.html')
            })
            .catch((error)=>{
                console.log(error+'when account create');
                
                alert('Account not create')
            })
        })
    }else{
        alert('Password not same')
    }
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