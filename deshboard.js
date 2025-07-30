
import { serverTimestamp,collection,signOut,db,addDoc,deleteDoc,doc ,where,getDocs ,onAuthStateChanged,query ,orderBy ,onSnapshot ,auth} from"./firebase.js"



onAuthStateChanged(auth, (user) => {
    if (user) {
     
      const uid = user.uid;
      let  userEmail = document.getElementById("user-Email")
      userEmail.innerHTML=` 📧 ${user.email}` 


      
      let formatted = moment().format("DD-MM-YYYY");

console.log(formatted);

let date = document.getElementById("date");
date.innerHTML = formatted;

     
      
      const getSkills =  () => {
        let namazDiv = document.getElementById("namaz");
      

        let offeredNamaz = [];
      
    
        let collectionRef = collection(db, user.uid);
        let dbRef = query(collectionRef, orderBy("timestamp", "asc"));
      
       
        onSnapshot(dbRef, (snapshot) => {
          
          offeredNamaz = [];
      
          snapshot.forEach((doc) => {
            let data = doc.data();
            offeredNamaz.push(data.namazName);
          });
      
        
          let allNamaz = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      
         
          namazDiv.innerHTML = "";
      
          for (let i = 0; i < allNamaz.length; i++) {
            let name = allNamaz[i];
            let status = "⏳ I haven’t prayed.";
      
            
            if (offeredNamaz.includes(name)) {
              status = "✅ I have offered my prayer.";
            }
      
            
            namazDiv.innerHTML += `
              <div class="card" onclick="markNamaz('${name}')">
                <h3>${name}</h3>
                <p>${status}</p>
              </div>
            `;
          }
        });
      };
            getSkills();
    










            const markNamaz = async (namazName) => {
              let dbRef = collection(db, user.uid);
          
              let q = query(dbRef,
                where("date", "==", formatted),
                where("namazName", "==", namazName)
              );
            
              let snapshot = await getDocs(q);
            
              if (!snapshot.empty) {
            
                let docId = snapshot.docs[0].id;
                await deleteDoc(doc(dbRef, docId));
                Swal.fire({
                  icon: 'info',
                  title: 'I haven’t prayed.',
                  text: `${namazName} has been unmarked.`,
                  confirmButtonColor: '#00ffcc'
                });
                
              } else {
            
                await addDoc(dbRef, {
                  date: formatted,
                  namazName: namazName,
                  timestamp: serverTimestamp()
                });
                Swal.fire({
                  icon: 'success',
                  title: 'I have offered my prayer.',
                  text: `${namazName} has been marked.`,
                  confirmButtonColor: '#00ffcc'
                });
                
              }
            };
            
            
            





            const toggleBtn = document.getElementById("menu-toggle");
            const sidebar = document.getElementById("sidebar");
            const closeBtn = document.getElementById("close-sidebar");
        
            toggleBtn.addEventListener("click", () => {
              sidebar.classList.toggle("active");
            });
        
            closeBtn.addEventListener("click", () => {
              sidebar.classList.remove("active");
            });





window.markNamaz =markNamaz


let logout = document.getElementById("logout")
logout.addEventListener("click",()=>{
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}) 





} else {
  location="./index.html"
}
});






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