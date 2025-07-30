

import {signInWithEmailAndPassword,auth,onAuthStateChanged  } from"./firebase.js"


onAuthStateChanged(auth, (user) => {
    if (user) {
     
      const uid = user.uid;
      
window.location= "deshboard.html"

    } else {
      // window.location= "./index.html"
    }
  });


let submit = document.getElementById("submit")

let email = document.getElementById("email")
let password = document.getElementById("password")



let loginUser = ()=>{

    
    signInWithEmailAndPassword(auth, email.value, password.value)
    


    
  .then((userCredential) => {
    
    const user = userCredential.user;
    
console.log(user);



})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    console.log(errorMessage);
    Swal.fire({
      title: 'Error!',
      text: errorMessage, // Firebase error message
      icon: 'error',      // use 'error' for error messages
      confirmButtonText: 'OK'
    });
    email.value=``
password.value=``
});

}
  submit.addEventListener("click",loginUser)   