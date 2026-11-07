import { firebaseConfig } from './config/firebase_config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
// import {getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from "https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

let app = initializeApp(firebaseConfig)
let db = getFirestore(app)

let totalUser = document.getElementById('totalUser')
let totalCategories = document.getElementById('totalCategories')
let totalProduct = document.getElementById('totalProduct')

async function getAllStats() {
    // user count
    const userRef = collection(db, 'users')
    const data = await getDocs(userRef)
    let userCount = data.docs.length
    totalUser.innerText = ''
    totalUser.innerText = userCount


    // category count
    const categoryRef = collection(db, 'Categories')
    const categoryData = await getDocs(categoryRef)
    let categoryCount = data.docs.length
    totalCategories.innerText = ''
    totalCategories.innerText = categoryCount


    // Product count
    const itemRef = collection(db, 'products')
    const itemData = await getDocs(itemRef)
    let itemCount = data.docs.length
    totalProduct.innerText = ''
    totalProduct.innerText = itemCount


}
getAllStats();