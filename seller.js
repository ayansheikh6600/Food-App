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

const DashboardDiv = document.querySelector(".DashboardDiv")
const ProdutctListDiv = document.querySelector(".ProdutctListDiv")
const ActiveOrderDiv = document.querySelector(".ActiveOrderDiv")
const DashBtn = document.querySelector(".DashBtn")
const ListBtn = document.querySelector(".ListBtn")
const activeBtn = document.querySelector(".activeBtn")
const Logout = document.querySelector(".Logout")


DashBtn.addEventListener("click" , dashboradShow)
ListBtn.addEventListener("click" , listShow)
activeBtn.addEventListener("click" , activeOrderShow)
Logout.addEventListener("click" , logoutuser)

function logoutuser(){
    const userlogout = signOut(auth).then(() => {
        console.log("sss")
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
