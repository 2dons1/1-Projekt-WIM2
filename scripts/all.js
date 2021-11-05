var x = document.getElementById("map");
var y = document.getElementById("location_text");


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, error);
} else { 
   x.innerHTML = "Preglednik ne podržava geolokaciju!";
   y.innerHTML = "Preglednik ne podržava geolokaciju!";
}

function showPosition(position) {
  
  const user = document.getElementById("user_name");
  const time = document.getElementById("login_time");
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  // Ovo treba spucat u bazu.
  console.log(user.innerHTML + "," + time.innerHTML + "," + latitude + "," + longitude);

  y.innerHTML = 
  "Geografska širina: " + latitude + "<br>" + 
  "Geografska dužina: " + longitude + "<br>";

  var mymap = L.map('map').setView([latitude, longitude], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'sk.eyJ1IjoiMmRvbnMiLCJhIjoiY2t2Z2lqdXd6MTlodjJ1bjNsajZ1dWFmaSJ9.tR_rFBw_5v0uSq9sQP7YLg' // 'sk.eyJ1IjoiMmRvbnMiLCJhIjoiY2t2Z2lqdXd6MTlodjJ1bjNsajZ1dWFmaSJ9.tR_rFBw_5v0uSq9sQP7YLg'
    }).addTo(mymap);
  var marker = L.marker([latitude, longitude]).addTo(mymap);
  marker.bindPopup("Ovo je demo tekst za 'prikaz informacije o oznaci na karti' <hr> Latitude: " + latitude + "<br>" + "Longitude: " + longitude);
}

function error(){
  x.innerHTML = "Nismo uspjeli dohvatiti vašu geolokaciju!";
  y.innerHTML = "Nismo uspjeli dohvatiti vašu geolokaciju!";
}