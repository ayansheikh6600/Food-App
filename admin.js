import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyD7_4erDgSCb-2gLwO4c-r6G_-d-vFyfOc",
    authDomain: "food-app-52499.firebaseapp.com",
    projectId: "food-app-52499",
    storageBucket: "food-app-52499.appspot.com",
    messagingSenderId: "729362715853",
    appId: "1:729362715853:web:c4eb90654d388b82148584",
    measurementId: "G-N891TY4P9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// const userNO = document.getElementById("userNO")
// const userName = document.getElementById("userName")
// const userEmail = document.getElementById("userEmail")
const CustomerData = document.getElementById("CustomerData")
const VendorData = document.getElementById("VendorData")
const ShowCustomer = document.getElementById("ShowCustomer")
const ShowVendor = document.getElementById("ShowVendor")
console.log(VendorData.innerHTML)
ShowCustomer.addEventListener("click", ShowCustomerData)
window.addEventListener("load", ShowCustomerData)
const usernumber = 0


async function ShowCustomerData() {
    VendorData.style.display="none"
    CustomerData.style.display = ""
    if(CustomerData.value == undefined){
        const querySnapshot = await getDocs(collection(db, "Buyers"));
        querySnapshot.forEach((doc) => {
    
            const Buydata = doc.data()
    
            const userName = Buydata.Name
            const userEmail = Buydata.email
            const userUID = Buydata.UID
            CustomerData.innerHTML += `<tr>
            <th scope="row">${usernumber}</th>
            <td>${userName}</td>
            <td>${userEmail}</td>
            <td>${userUID}</td></tr>`

            CustomerData.value = 1
            // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
        });
    }
    
}
console.log(VendorData.value)
ShowVendor.addEventListener("click" , ShowVendorData)
async function ShowVendorData(){
    if(VendorData.value == undefined){
        const querySnapshot = await getDocs(collection(db, "sellers"));
    querySnapshot.forEach((doc) => {

        const Vendata = doc.data()
        console.log(Vendata)
        const userName = Vendata.Name
        const userEmail = Vendata.email
        const userUID = Vendata.UID
        VendorData.innerHTML += `<tr>
        <th scope="row">${usernumber}</th>
        <td>${userName}</td>
        <td>${userEmail}</td>
        <td>${userUID}</td></tr>`
        VendorData.value = 1

        // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
    });
    }
    

    CustomerData.style.display = "none"
    VendorData.style.display = ""

}