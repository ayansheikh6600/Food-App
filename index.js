import { getFirestore, collection, doc, setDoc, query, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";

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
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);

window.addEventListener("load", getProduct)

// console.log("hi")
const indexProductDiv = document.getElementById("indexProductDiv")
var counter = 0

async function getProduct() {
    const querySnapshot = await getDocs(collection(db, "Product"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data())

        if (counter < 3) {
            console.log(doc.data().ProductSrc)

            const imageSrc = doc.data().ProductSrc;
            const ProductPrice = doc.data().ProductPrice;
            const ProductName = doc.data().ProductName;

            const card = `<div class="ListProduct col-md-3">
                <div class="card maouot" style="width: 16rem;">
                    <img src="${imageSrc}" class="card-img-top" style="height: 170px ;" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${ProductName}</h5>
                        <p class="card-text">${ProductPrice}</p>
                    </div>
                </div>
            </div>`

            indexProductDiv.innerHTML += card



        }

        counter++

        // doc.data() is never undefined for query doc snapshots
        //   console.log(doc.id, " => ", doc.data());
    });

}