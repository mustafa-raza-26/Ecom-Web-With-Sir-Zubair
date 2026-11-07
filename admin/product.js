import { firebaseConfig } from './config/firebase_config.js'
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getFirestore, collection, where, getDocs, query, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

let app = initializeApp(firebaseConfig);
let db = getFirestore(app);

// Add Item
let itemName = document.getElementById('itemName');
let itemCategory = document.getElementById('itemCategory');
let itemPrice = document.getElementById('itemPrice');
let addBtn = document.getElementById('addItem')

if (addBtn) {
    addBtn.addEventListener('click', async () => {
        const productRef = doc(collection(db, 'products'));

        await setDoc(productRef, {
            itemKey : productRef.id,
            ItemName: itemName.value,
            ItemCategory : itemCategory.value,
            ItemPrice : itemPrice.value,
            createdAt : serverTimestamp()
        })
        alert('Item Add')
        displayItem()
    })
}

let totalProduct;
let productTable = document.getElementById('productTable')

async function displayItem (){
    let productRef = collection(db, 'products');
    const data = await getDocs(productRef)
    totalProduct = data.docs.length

    productTable.innerHTML = ''
    
    for (const value of data.docs) {
        productTable.innerHTML += `
            <tr>
                <td>${value.data().itemKey}</td>
                <td class="product-name">${value.data().ItemName}</td>
                <td>${value.data().ItemCategory}</td>
                <td class="price">$${value.data().ItemPrice}</td>
                <td class="productAddDate">${value.data().createdAt}</td>
            </tr>
        `

    }
}
displayItem()


// Add Category
let categoryName = document.getElementById('categoryName');
let addCategory = document.getElementById('addCategory')

if (addCategory) {
    addCategory.addEventListener('click', async () => {
        const categoryRef = doc(collection(db, 'Categories'));

        await setDoc(categoryRef, {
            categoryKey : categoryRef.id,
            CategoryName: categoryName.value,
            createdAt : serverTimestamp()
        })
        alert('Category Add')
        displayCategory()
    })
}

let totalCategory;
let categoryTable = document.getElementById('categoryTable')

async function displayCategory (){
    let categoryRef = collection(db, 'Categories');
    const data = await getDocs(categoryRef)
    totalCategory = data.docs.length
    
    categoryTable.innerHTML = ''

    for (const value of data.docs) {
        categoryTable.innerHTML += `
            <tr>
                <td>${value.data().categoryKey}</td>
                <td>${value.data().CategoryName}</td>
                <td>${value.data().createdAt}</td>
            </tr>
        `

    }
}
displayCategory()


// Category add in select
window.onload = async () => {
    let categoryRef = collection(db, 'Categories');
    const data = await getDocs(categoryRef)

    for (const value of data.docs) {
        itemCategory.innerHTML += `
            <option value="Select Option">${value.data().CategoryName}</option>
        `
    }
}