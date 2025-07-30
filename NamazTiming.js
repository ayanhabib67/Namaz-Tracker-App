import {onAuthStateChanged,auth  } from"./firebase.js"


onAuthStateChanged(auth, (user) => {
    if (user) {
    
        
        
var cityDropdown = document.getElementById("city");


cityDropdown.addEventListener("change", function() {
    var selectedCity = this.value;
    if (selectedCity) {
   
    
        let formatted = moment().format("DD-MM-YYYY");

        console.log(formatted);



    fetch(`https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Pakistan&method=2`)
.then(res => res.json())
.then(data => {
    console.log(data.data.timings);
    console.log("City:", selectedCity);
    
    
    let Fajr = convertTo12Hour(data.data.timings.Fajr);
    let Sunrise = convertTo12Hour(data.data.timings.Sunrise);
    let Dhuhr = convertTo12Hour(data.data.timings.Dhuhr);
    let Asr = convertTo12Hour(data.data.timings.Asr);
    let Sunset = convertTo12Hour(data.data.timings.Sunset);
    let Maghrib = convertTo12Hour(data.data.timings.Maghrib);
    let Isha = convertTo12Hour(data.data.timings.Isha);
    
    
    
    
    
    let namazTiming = document.getElementById("namazTiming")
    namazTiming.innerHTML=`      
    <span class="namaz-name">${selectedCity}</span>
    <span class="namaz-name">${formatted}</span>
    <div class="namaz-card">
    <span class="namaz-name">Fajr</span>
    <span class="namaz-time">${Fajr} AM</span>
    </div>
    <div class="namaz-card">
    <span class="namaz-name">Sunrise</span>
        <span class="namaz-time">${Sunrise} </span>
        </div>
        <div class="namaz-card">
        <span class="namaz-name">Dhuhr</span>
        <span class="namaz-time">${Dhuhr} </span>
        </div>
        <div class="namaz-card">
        <span class="namaz-name">Asr</span>
        <span class="namaz-time">${Asr} </span>
        </div>
        <div class="namaz-card">
        <span class="namaz-name">Sunset</span>
        <span class="namaz-time">${Sunset} </span>
        </div>
        <div class="namaz-card">
        <span class="namaz-name">Maghrib</span>
        <span class="namaz-time">${Maghrib} </span>
        </div>
        <div class="namaz-card">
        <span class="namaz-name">Isha</span>
        <span class="namaz-time">${Isha} </span>
        </div>
        
        <button class="check-btn" onclick="checkAnother()">🔄 Check Another City</button>

        `
        
        function convertTo12Hour(t) {
            let h = t.split(":")[0] * 1; 
            let m = t.split(":")[1];
            return (h % 12 || 12) + ":" + m + (h >= 12 ? " PM" : " AM");
        }
        
        
        
    });
}
cityDropdown.style.display = "none";
function checkAnother() {
    window.location.reload();

  }
  window.checkAnother = checkAnother;
  
  







  
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
} else {
 location="./index.html"
}
});