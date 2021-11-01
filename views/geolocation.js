var x = document.getElementById("location");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const acc = position.coords.accuracy;

  x.innerHTML = 
  "Geografska širina: " + latitude + "<br>" + 
  "Geografska dužina: " + longitude + "<br>" + 
  "Točnost: " + acc;
}