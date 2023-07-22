import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";


const firebaseConfig = {
    apiKey: "AIzaSyAXy6TUYsc-BZq31qiV61mbkYv43d2BBLE",
    authDomain: "food-app-82e50.firebaseapp.com",
    projectId: "food-app-82e50",
    storageBucket: "food-app-82e50.appspot.com",
    messagingSenderId: "643385534916",
    appId: "1:643385534916:web:a29f70b141258836829c91",
    measurementId: "G-D3ZK7L7LZP"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)





const auth = getAuth();

const ProductNameInput = document.querySelector("#ProductNameInput")
const addProductBtn = document.querySelector("#addProductBtn")
const DashboardDiv = document.querySelector(".DashboardDiv")
const ProdutctListDiv = document.querySelector(".ProdutctListDiv")
const ActiveOrderDiv = document.querySelector(".ActiveOrderDiv")
const DashBtn = document.querySelector(".DashBtn")
const ListBtn = document.querySelector(".ListBtn")
const activeBtn = document.querySelector(".activeBtn")
const Logout = document.querySelector(".Logout")
const productlistingRow = document.querySelector(".productlistingRow")


addProductBtn.addEventListener("click" , addproductDiv)
DashBtn.addEventListener("click" , dashboradShow)
ListBtn.addEventListener("click" , listShow)
activeBtn.addEventListener("click" , activeOrderShow)
Logout.addEventListener("click" , logoutuser)


function addproductDiv(){
  const input = ProductNameInput.value
  const productDiv = `<div class="ListProduct col-md-4">
  <div class="card" style="width: 18rem;">
      <img src="..." class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">${input}</h5>
          <p class="card-text">Some quick example text to build on the card title and make
              up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
  </div>
</div>`

ProdutctListDiv.innerHTML += productDiv
}

function logoutuser(){
    const userlogout = signOut(auth).then(() => {
        console.log("sss")
        alert("successfull")
        window.location.replace("./index.html")
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}

function dashboradShow(){
    ActiveOrderDiv.style.display = "none"
    ProdutctListDiv.style.display = "none"
    DashboardDiv.style.display = "block"
}
function listShow(){
    ActiveOrderDiv.style.display = "none"
    DashboardDiv.style.display = "none"
    ProdutctListDiv.style.display = "block"
}
function activeOrderShow(){
    ProdutctListDiv.style.display = "none"
    DashboardDiv.style.display = "none"
    ActiveOrderDiv.style.display = "block"
}

