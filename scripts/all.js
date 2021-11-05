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

  const urlGet = document.getElementById("get");
  const urlPost = document.getElementById("post");
  // Ovo treba spucat u bazu.
  console.log(user.innerHTML + "," + time.innerHTML + "," + latitude + "," + longitude);

  y.innerHTML = 
  "Geografska širina: " + latitude + "<br>" + 
  "Geografska dužina: " + longitude + "<br>";

  var mymap = L.map('map').setView([45.032022, 16.285627], 7);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'sk.eyJ1IjoiMmRvbnMiLCJhIjoiY2t2Z2lqdXd6MTlodjJ1bjNsajZ1dWFmaSJ9.tR_rFBw_5v0uSq9sQP7YLg' // 'sk.eyJ1IjoiMmRvbnMiLCJhIjoiY2t2Z2lqdXd6MTlodjJ1bjNsajZ1dWFmaSJ9.tR_rFBw_5v0uSq9sQP7YLg'
    }).addTo(mymap);
  // var marker = L.marker([latitude, longitude]).addTo(mymap);
  // marker.bindPopup("User: " + user.innerHTML + "<br>Vrijeme prijave: " +  time.innerHTML + "<br><hr> Latitude: " + latitude + "<br>" + "Longitude: " + longitude);

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", urlGet.innerHTML, false );
  xmlHttp.send( null );
  const markers = JSON.parse(xmlHttp.responseText);

  let new_json = {"user": user.innerHTML, "time": time.innerHTML, "lat": latitude, "long": longitude};
  let logged = 0;
  for (let i = 0; i < markers.length; i++) {
    if(markers[i]['user'] == new_json['user'] && markers[i]['time'] == new_json['time']){
        logged = 1;
        break;
    }
  }
  if(logged == 0){
    markers[markers.length] = new_json;
  }  

  for (let i = 0; i < markers.length; i++) {
    var marker = L.marker([markers[i]['lat'], markers[i]['long']]).addTo(mymap);
    marker.bindPopup("User: " + markers[i]['user'] + "<br>Vrijeme prijave: " +  markers[i]['time'] + "<br><hr> Latitude: " + markers[i]['lat'] + "<br>" + "Longitude: " + markers[i]['long']);
  }
  // TESTIRANJE
  var data = JSON.stringify(markers);
  
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;
  
  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText);
    }
  });
  
  xhr.open("POST", urlPost.innerHTML);
  xhr.setRequestHeader("Content-Type", "application/json");
  
  xhr.send(data);
}

function error(){
  x.innerHTML = "Nismo uspjeli dohvatiti vašu geolokaciju!";
  y.innerHTML = "Nismo uspjeli dohvatiti vašu geolokaciju!";
}