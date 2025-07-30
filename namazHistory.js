import { signOut,collection,db,  onAuthStateChanged,query ,orderBy ,onSnapshot ,auth} from"./firebase.js"

onAuthStateChanged(auth, (user) => {
    if (user) {
      
   
        
        let getNamaz = async () => {
            let historyContainer = document.getElementById("historyContainer");
            let collectionRef = collection(db, user.uid);
            let dbRef = query(collectionRef, orderBy("timestamp", "asc"));
          
            onSnapshot(dbRef, (snapshot) => {
                historyContainer.innerHTML = ``;
              
                let currentDate = "";
              
                snapshot.forEach((doc) => {
                  let data = doc.data();
                  let date = data.date;
                  let namaz = data.namazName;
           
                  if (date !== currentDate) {
                    currentDate = date;
                    historyContainer.innerHTML += `<div class="history-date">📅 ${date}</div>`;
                  }
              
                  historyContainer.innerHTML += `
                    <div class="namaz-item">
                      <span>${namaz}</span>
                      <span class="offered">✅ Offered</span>
                    </div>
                  `;
                });
              });
              
          };
          
          getNamaz();
          
    
    
    let MissedPraye = document.getElementById("MissedPraye")
    MissedPraye.addEventListener("click",()=>{
        location="./MissedPraye.html"
    })

    let logout = document.getElementById("logout")
logout.addEventListener("click",()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}) 

    
    

window.addEventListener('online', () => {
  Swal.fire({
    icon: 'success',
    title: '✅ Online',
    text: 'You are back online!',
    timer: 2000,
    showConfirmButton: false
  });
});





window.addEventListener('offline', () => {
  Swal.fire({
    icon: 'warning',
    title: '⚠️ Offline',
    text: 'You are offline now! Please connect to the internet.',
    timer: 2000,
    showConfirmButton: false
  });
});
    
    } else {
location="./index.html"
    }
  });