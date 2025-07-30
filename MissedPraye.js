import {serverTimestamp,collection,db,addDoc,onAuthStateChanged,auth,signOut} from "./firebase.js";

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    const addNamazBtn = document.getElementById("addNamaz");

    addNamazBtn.addEventListener("click", async () => {
      
      const missedDate = document.getElementById("missedDate").value;
      
      if (missedDate) {
        const dbRef = collection(db, uid);
      
        const allPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      
        for (let prayer of allPrayers) {
          const isChecked = document.getElementById(prayer).checked;
      
          if (isChecked) {
            await addDoc(dbRef, {
              date: missedDate,
              namazName: prayer,
              timestamp: serverTimestamp()
            });
          }
        }
      
        Swal.fire("✅ Success", "Missed prayers added.", "success");
      } else {
        Swal.fire("❌ Error", "Please select a date.", "error");
      }
      
    });


    let logout = document.getElementById("logout")
    logout.addEventListener("click",()=>{
      signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    }) 


  } else {
    location = "./index.html";
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
