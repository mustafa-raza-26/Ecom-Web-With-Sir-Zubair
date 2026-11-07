import { firebaseConfig } from './config/firebase_config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userPassword = document.getElementById('userPassword');
let userConfirmPassword = document.getElementById('userConfirmPassword');
let userContactNumber = document.getElementById('userContactNumber');
let createAccount = document.getElementById('createAccount');
let confirmFeedback = document.getElementById('confirmFeedback');

// Optional: Real-time visual feedback when typing confirm password
userConfirmPassword.addEventListener('input', () => {
    if (userConfirmPassword.value && userPassword.value !== userConfirmPassword.value) {
        userConfirmPassword.classList.add('is-invalid');
        if (confirmFeedback) confirmFeedback.style.display = 'block';
    } else {
        userConfirmPassword.classList.remove('is-invalid');
        if (confirmFeedback) confirmFeedback.style.display = 'none';
    }
});

if (createAccount) {
    createAccount.addEventListener('click', async (e) => {
        e.preventDefault();

        // Check if passwords match when the button is clicked
        if (userPassword.value !== userConfirmPassword.value) {
            alert('Password not same');
            return; // Stop execution if passwords don't match
        }

        try {
            // Create user with Firebase Auth
            const data = await createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value);
            console.log(data);
            alert('Account Created\nEmail Sent For Verification');

            // Email Verification
            await sendEmailVerification(data.user);
            
            // Store Admin Data (SECURITY FIX: Removed password from Firestore)
            await setDoc(doc(db, 'admin', data.user.uid), {
                userName: userName.value,
                email: userEmail.value,
                password: userPassword.value,
                contact_Number: userContactNumber.value // Fixed typo from conatct_Number
            });

            window.location.replace('./index.html');
        } catch (error) {
            console.log(error + ' when account create');
            alert('Account not created: ' + error.message);
        }
    });
}

// Show / hide password
document.querySelectorAll('[data-toggle-pass]').forEach((btn) => {
    if (btn) {
        btn.addEventListener('click', () => {
            let input = document.getElementById(btn.dataset.togglePass);
            let icon = btn.querySelector('i');
            let show = input.type === 'password';
            
            input.type = show ? 'text' : 'password';
            icon.classList.toggle('fa-eye', !show);
            icon.classList.toggle('fa-eye-slash', show);
            btn.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
        });
    }
});