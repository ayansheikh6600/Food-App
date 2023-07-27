import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, query, getDocs } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";


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
const auth = getAuth();

const addProductBtn = document.querySelector("#addProductBtn")
const ProductPrice = document.querySelector("#ProductPrice")
const ImageBtn = document.querySelector("#ImageBtn")
const ProductCategory = document.querySelector("#ProductCategory")
const DashboardDiv = document.querySelector(".DashboardDiv")
const ProdutctListDiv = document.querySelector(".ProdutctListDiv")
const ActiveOrderDiv = document.querySelector(".ActiveOrderDiv")
const DashBtn = document.querySelector(".DashBtn")
const ListBtn = document.querySelector(".ListBtn")
const activeBtn = document.querySelector(".activeBtn")
const Logout = document.querySelector(".Logout")
const productlistingRow = document.querySelector(".productlistingRow")


DashBtn.addEventListener("click", dashboradShow)
ListBtn.addEventListener("click", listShow)
activeBtn.addEventListener("click", activeOrderShow)
Logout.addEventListener("click", logoutuser)

function logoutuser() {
    const userlogout = signOut(auth).then(() => {
        console.log("sss")
        alert("successfull")
        window.location.replace("./index.html")
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
}

function dashboradShow() {
    ActiveOrderDiv.style.display = "none"
    ProdutctListDiv.style.display = "none"
    DashboardDiv.style.display = "block"
}
function listShow() {
    ActiveOrderDiv.style.display = "none"
    DashboardDiv.style.display = "none"
    ProdutctListDiv.style.display = "block"
}
function activeOrderShow() {
    ProdutctListDiv.style.display = "none"
    DashboardDiv.style.display = "none"
    ActiveOrderDiv.style.display = "block"
}

// addProductBtn.addEventListener("click", listAProduct)



//----------------------Images Show-------------
const close = document.querySelector(".close")
const SearchImageInput = document.querySelector("#SearchImageInput")
const SerchImage = document.querySelector("#SerchImage")
const imagesDiv = document.querySelector(".imagesDiv")
const AccessKey = "52i2wRG0PRr2qkh9qpnSq5AczURPgj7CI0qw9KLu_yk"

let inputData = ""
let page =1;


SerchImage.addEventListener("click", SearchImages)
async function SearchImages() {
    inputData = SearchImageInput.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${AccessKey}`
    const response = await fetch(url)
    const data = await response.json()

    const results = data.results
    console.log(results)

    //    console.log(results)
    await results.map((result) => {
        const imagewrapper = document.createElement("div")
        const image = document.createElement("img")
        image.src = result.url
        const imgLink = result.urls.small
        console.log(result)

        const divResult = `<div class="card" style="width: 18rem;">
        <img src="${imgLink}" class="card-img-top" onclick=getImageUrl(this) alt="...">
      </div>`

      imagesDiv.innerHTML += divResult
    })
}
var selectedImageUrl;
function getImageUrl(e){
 selectedImageUrl = e.src
    console.log(selectedImageUrl)

    const card = `<div class="card" style="width: 18rem;">
    <img src="${selectedImageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-text">${prompt("Enter Prodct Name")}</h5>
        <p class="card-text">${"PKR: "+ prompt("Enter Prodct Price")}</p>
        <a class="btn btn-primary" onclick=listAproduct(this)>List Product</a>
    </div>
</div>`
    close.click()

    productlistingRow.innerHTML += card
}

async function listAproduct(e){
    const ProductSrc= e.parentNode.parentNode.children[0].src
    const ProductName= e.parentNode.parentNode.children[1].children[0].innerHTML
    const ProductPrice= e.parentNode.parentNode.children[1].children[1].innerHTML
    const sellerUID = localStorage.getItem("userUID")
    console.log(sellerUID)

 const ProductObj = {
    ProductName,
    ProductPrice,
    ProductSrc,
    ProductId : sellerUID
 }


try{
    const docse = await setDoc(doc(db, "Product", sellerUID), ProductObj)
   console.log(docse)
}catch(e){
    console.error("Error adding document: ", e);
}
   
    // const q = query(collection(db, "sellers"));

    // const querySnapshot = await getDocs(q);
    // const queryData = querySnapshot.docs.map((detail) => ({
    //     ...detail.data()
    // }))
    // console.log(queryData)
    // queryData.map(async (v, id) => {
    //     await setDoc(doc(db, `sellers/${sellerUID}/Products`, sellerUID), {
    //         ProductName: ProductName,
    //         ProductId: sellerUID,
    //         sellerUID : sellerUID,
    //         ProductPrice: ProductPrice,
    //         imageSrc : ProductSrc
    //     })
    // })
}


const productlistingRow1 = document.querySelector(".productlistingRow1")

window.addEventListener("load", showlistedProduct)
async function showlistedProduct(){

    const querySnapshot = await getDocs(collection(db, "Product"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
      // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    });


}




window.getImageUrl = getImageUrl
window.listAproduct = listAproduct