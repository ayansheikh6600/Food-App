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

const ProductNameInput = document.querySelector("#ProductNameInput")
const ShowListProductDiv = document.querySelector("#ShowListProductDiv")
const listProductInputDiv = document.querySelector("#listProductInputDiv")
const addProductBtn = document.querySelector("#addProductBtn")
const ProductName = document.querySelector("#ProductName")
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


// addProductBtn.addEventListener("click" , addproductDiv)
DashBtn.addEventListener("click", dashboradShow)
ListBtn.addEventListener("click", listShow)
activeBtn.addEventListener("click", activeOrderShow)
Logout.addEventListener("click", logoutuser)


// function addproductDiv() {
//     const input = ProductNameInput.value
//     const productDiv = `<div class="ListProduct col-md-4">
//   <div class="card" style="width: 18rem;">
//       <img src="..." class="card-img-top" alt="...">
//       <div class="card-body">
//           <h5 class="card-title">${input}</h5>
//           <p class="card-text">Some quick example text to build on the card title and make
//               up the bulk of the card's content.</p>
//           <a href="#" class="btn btn-primary">Go somewhere</a>
//       </div>
//   </div>
// </div>`

//     ProdutctListDiv.innerHTML += productDiv
// }

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

addProductBtn.addEventListener("click", listAProduct)
async function listAProduct() {

    var userUID = localStorage.getItem("userUID")
    console.log(userUID)
    const q = query(collection(db, "sellers"));

    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data()
    }))
    console.log(queryData)
    queryData.map(async (v, id) => {
        await setDoc(doc(db, `sellers/${userUID}/Products`, userUID), {
            ProductName: ProductName.value,
            ProductId: userUID,
            ProductPrice: ProductPrice.value,
            ProductCategory: ProductCategory.value
        })
    })
}
ShowListProductDiv.addEventListener("click", ShowListDiv)

function ShowListDiv() {
    ShowListProductDiv.style.display = "none"
    ImageBtn.style.display = "block"
    addProductBtn.style.display = "block"
    listProductInputDiv.style.display = "block"
}

ImageBtn.addEventListener("click", ShowImages)

async function ShowImages() {
    console.log("hii")
    // window.open("./images.html", "win1", "width=500, height=500 , left = 40% , top = 40% ")

}


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

    const card = `<div class="card z-index" style="width: 18rem;">
    <img src="${selectedImageUrl}" class="card-img-top" alt="...">
    <div class="card-body">
        <p class="card-text">${prompt("Enter Prodct Name")}</p>
    </div>
</div>`
    close.click()

    productlistingRow.innerHTML += card
}





window.getImageUrl = getImageUrl