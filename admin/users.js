import { firebaseConfig } from './config/firebase_config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js";

let app = initializeApp(firebaseConfig);
let db = getFirestore(app);

// Target the tbody instead of the table itself
let userDataDisplay = document.getElementById('userDataDisplay');

async function getAllStats() {
    try {
        const userRef = collection(db, 'users');
        const data = await getDocs(userRef);
        
        // Clear previous rows safely
        userDataDisplay.innerHTML = '';

        if (data.empty) {
            userDataDisplay.innerHTML = `<tr><td colspan="5" style="text-align: center;">No users found</td></tr>`;
            return;
        }

        for (let value of data.docs) {
            let userData = value.data();
            
            // Use fallback values if fields might be missing in Firestore
            let userName = userData.userName || 'N/A';
            let email = userData.email || 'N/A';
            // Note: Make sure this matches your Firestore field name exactly (e.g., userData.contact_Number or userData.conatct_Number)
            let contact = userData.conatct_Number || userData.contact_Number || 'N/A';

            userDataDisplay.innerHTML += `
                <tr>
                    <td>${value.id}</td> <!-- Displays the unique Firebase Document ID -->
                    <td>${userName}</td>
                    <td>${email}</td>
                    <td>${contact}</td>
                    <td><i class="fa-regular fa-eye" style="cursor: pointer;"></i></td>
                </tr>
            `;
        }
    } catch (error) {
        console.error("Error fetching user stats: ", error);
    }
}

getAllStats();