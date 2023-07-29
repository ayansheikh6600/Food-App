import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs ,doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);


const email = document.getElementById("Semail")
const Lemail = document.getElementById("Lemail")
const Lpassword = document.getElementById("Lpassword")
const password = document.getElementById("Spassword")
const signupBtn = document.getElementById("signupBtn")
const userSignup = document.getElementById("userSignup")
const LoginDiv = document.getElementById("LoginDiv")
const SignupDiv = document.getElementById("SignupDiv")
const userLogin = document.getElementById("userLogin")
const Buyer = document.getElementById("Buyer")
const Seller = document.getElementById("Seller")
const waitDiv = document.getElementById("waitDiv")
const loginBtn = document.getElementById("loginBtn")
const SignupMenu = document.querySelector(".SignupMenu")
const SellerDiv = document.querySelector(".SellerDiv")
const BuyerDiv = document.querySelector(".BuyerDiv")
const FirstName = document.querySelector("#FirstName")
const LastName = document.querySelector("#LastName")
var fullName;

Buyer.addEventListener("click", BuyerProfile)
loginBtn.addEventListener("click", login)
Seller.addEventListener("click", SellerProfile)
userSignup.addEventListener("click", showSignup)
userLogin.addEventListener("click", showLogin)
function showSignup() {

  LoginDiv.style.display = "none"
  SignupDiv.style.display = "block"

}
async function login() {
  console.log("sss")
  if(!Lemail.value || !Lpassword.value){
    alert("Enter Input Fields")
    return
  }
 await signInWithEmailAndPassword(auth, Lemail.value, Lpassword.value)
  .then(async (userCredential) => {
    // Signed in 
    const user = userCredential.user;

    console.log(user.uid)
    console.log(user)
    const querySnapshot = await getDocs(collection(db, "Admin"));
querySnapshot.forEach((doc) => {
  const data = doc.data()
  console.log(data.status)
  console.log(user.status)
  console.log(data)
  if(data.UID == user.uid && data.status == true){
    console.log(data.UID)
    window.location.replace("./Admin.html")
  }
});


const BuyerData = await getDocs(collection(db, "Buyers"));
BuyerData.forEach((doc) => {
  const Buydata = doc.data()
  console.log(Buydata.status)
  console.log(user.status)
  console.log(Buydata)

  if(Buydata.UID == user.uid && Buydata.status == false){
    window.location.replace("./BuyerDashboard.html")
    
  }
  

});

const SellerData = await getDocs(collection(db, "sellers"));
SellerData.forEach((doc) => {
  const Selldata = doc.data()
  console.log(Selldata.status)
  console.log(user.status)
  console.log(Selldata)

  if(Selldata.UID == user.uid && Selldata.status == true){
     window.location.replace("./seller.html")
  }
 

});


    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}
function showLogin() {
  SignupDiv.style.display = "none"
  LoginDiv.style.display = "block"


}

const Buyers = {
  Name: "",
  email : email.value,
  status : true,
  UID : ""
}


function BuyerProfile() {
  SellerDiv.style.display = "none"
  BuyerDiv.style.display = "none"
  SignupMenu.style.display = "block"
  Buyers.status = false



}

//------------------------ golablly object decelared
const sellers = {
  Name : "",
  status: true,
  email: email.value,
  UID : ""
}
console.log(sellers)





function SellerProfile() {
  SellerDiv.style.display = "none"
  BuyerDiv.style.display = "none"
  SignupMenu.style.display = "block"
  sellers.status = false;
  console.log(sellers)

}







//---------------------Signup------------------------------
signupBtn.addEventListener("click", UserSignup)

async function UserSignup() {


  if (!email.value || !password.value) {
    alert("Enter Value")
    return
  }
  fullName = FirstName.value +" " +LastName.value
  console.log(fullName)
 await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)

      if(sellers.status == false){
        try {
          sellers.Name = fullName
          sellers.UID = user.uid;
          sellers.email = email.value;
          sellers.status = sellers.status;
          const userRef = doc(db , "sellers", user.uid)
          const userData = await setDoc(userRef, sellers)
          localStorage.setItem("userUID" , JSON.stringify(sellers))
          SignupMenu.style.display = "none"
          waitDiv.style.display = "block"
          console.log("Document written with ID: ", userRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
      
        }
      }
      if(Buyers.status == false){
        try {
          Buyers.Name = fullName
          Buyers.UID = user.uid;
          Buyers.email = email.value;
          Buyers.status = Buyers.status;
          const userRef = doc(db , "Buyers", user.uid)
          const userData = await setDoc(userRef, Buyers)
          localStorage.setItem("userUID" , JSON.stringify(Buyers))
          // SignupMenu.style.display = "none"
          // waitDiv.style.display = "block"
          window.location.replace("./BuyerDashboard.html")
          console.log("Document written with ID: ", userRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
      
        }
      }
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
