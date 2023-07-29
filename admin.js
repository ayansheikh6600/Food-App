import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore,getDoc, collection, addDoc, getDocs, doc, updateDoc, setDoc} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";


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
const PageUID = document.getElementById("PageUID")
// console.log(VendorData.innerHTML)
ShowCustomer.addEventListener("click", ShowCustomerData)
window.addEventListener("load", ShowCustomerData)
var usernumber = 1


async function ShowCustomerData() {
    // PageUID.innerHTML = "UID"
    VendorData.style.display = "none"
    CustomerData.style.display = ""
    if (CustomerData.value == undefined) {
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
// console.log(VendorData.value)
ShowVendor.addEventListener("click", ShowVendorData)
async function ShowVendorData() {
    // PageUID.innerHTML = "Status"
    if (VendorData.value == undefined) {
        const querySnapshot = await getDocs(collection(db, "sellers"));
        querySnapshot.forEach((doc) => {

            const Vendata = doc.data()
            // console.log(Vendata)
            const userName = Vendata.Name
            const userEmail = Vendata.email
            const userStatus = Vendata.status
            const userUID = Vendata.UID
            VendorData.innerHTML += `<tr>
        <th scope="row">${usernumber}</th>
        <td>${userName}</td>
        <td>${userEmail}</td>
        <td>${userUID}</td>
        <td>${userStatus ? `<div class="form-check form-switch">
            <input class="form-check-input" onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" checked>
          </div>` : `<div class="form-check form-switch">
          <input class="form-check-input"  onchange={handleAccountActivation(this)} type="checkbox" id="flexSwitchCheckChecked" >
        </div>`

                }</td>
             </tr>`
            VendorData.value = 1
            usernumber++

            // doc.data() is never undefined for query doc snapshots
            //   console.log(doc.id, " => ", doc.data());
        });
    }


    CustomerData.style.display = "none"
    VendorData.style.display = ""

}

async function handleAccountActivation(e) {
    // console.log(e.parentNode.parentNode.parentNode.children[3].innerHTML)
    const venderUID = (e.parentNode.parentNode.parentNode.children[3].innerHTML)

    const docRef = doc(db, "sellers", venderUID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        const venderData = docSnap.data()

        if(venderData.status == false ){
            venderData.status = true

            await updateDoc(docRef, venderData);
            window.location.reload()
        }else{
            venderData.status = false
            await updateDoc(docRef, venderData);
            window.location.reload()

        }
        // console.log(venderData)


    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}


window.handleAccountActivation = handleAccountActivation