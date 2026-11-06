import { firebaseConfig } from './firebase-Config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
const firebase = 'https://userapp-6a08f-default-rtdb.asia-southeast1.firebasedatabase.app/'
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
console.log(auth);

const db = getFirestore(app)

const userName = document.getElementById('userName');
const userEmail = document.getElementById('userEmail');
const userPassword = document.getElementById('userPassword');
const userAge = document.getElementById('userAge');
const userDob = document.getElementById('userDob');
const userCnic = document.getElementById('userCnic');
const userContact = document.getElementById('userContact');
const imageUpload = document.getElementById('imageUpload');
const imageView = document.getElementById('imageView');
const signupBtn = document.getElementById('signupBtn')

const cloudName = 'hwbc9nam'
let bucket = 'userImage'

let image=""

async function imageUploadfunc() {
    try {
    
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', bucket)

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData
        })

        const data = await response.json()
        console.log(data.secure_url);
        const imageUrl = data.secure_url
        return imageUrl
    }
    catch {
        alert('pic not save')
    }
}

if (imageUpload) {
    imageUpload.addEventListener("change", async (e) => {
         image = (e.target.files[0]);
        const imageUrl = URL.createObjectURL(image)
        imageView.src = imageUrl
        imageView.setAttribute('style', 'width:150px;height:150px;border-radius:20%;')
    })
}

if (signupBtn) {
    signupBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        await createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
            .then(async (data) => {
                console.log(data);
                alert('Account create and email send for verification')
                await sendEmailVerification(data.user)
                const img = await imageUploadfunc()
                await setDoc(doc(db, 'users', data.user.uid), {
                    userName: userName.value,
                    email: userEmail.value,
                    password: userPassword.value,
                    age: userAge.value,
                    dob: userDob.value,
                    cnic: userCnic.value,
                    image: img,
                    conatct_Number: userContact.value
                })
                window.location.replace('./index.html')
            })
            .catch((error) => {
                console.log(error);
                alert('Account not create')
            })
    })
}